import Coupon from "../Models/coupon.js";
import Claim from "../Models/claim.js";

const COOLDOWN = 60 * 60 * 1000;

const abuseCheck = async (ip, cookieId) => {
  const recentClaim = await Claim.findOne({
    $or: [{ ip }, { cookieId }],
    claimedAt: { $gt: new Date(Date.now() - COOLDOWN) },
  });
  return recentClaim;
};

export async function claimCoupon(req, res) {
  try {
    const ip = req.ip;
    let cookieId = req.cookies.couponCookie;

    // If no cookie exists, create one (a simple random string)
    if (!cookieId) {
      cookieId = Math.random().toString(36).substring(2); // Generate a random string
      res.cookie("couponCookie", cookieId, { httpOnly: true });
    }

    // Check for abuse: has this IP or cookie claimed a coupon within the cooldown period?
    const abused = await abuseCheck(ip, cookieId);
    if (abused) {
      return res.status(429).json({
        message:
          "You have already claimed a coupon recently. Please try again later.",
      });
    }

    // Find next available coupon using round-robin
    const coupon = await Coupon.findOneAndUpdate(
      { available: true, claimed: false }, // Query: coupon must be available and not yet claimed
      { claimed: true, claimedAt: new Date() }, // Update: mark it as claimed and record the claim time
      { sort: { order: 1 }, new: true } // Options: sort by order ascending; return the updated document
    );

    if (!coupon) {
      return res
        .status(404)
        .json({ message: "No coupons available at the moment." });
    }

    await Claim.create({ coupon: coupon._id, ip, cookieId });

    // Send a success message along with the claimed coupon details
    res.json({ message: "Coupon claimed successfully!", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
