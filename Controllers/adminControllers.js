import jwt from "jsonwebtoken";

import Coupon from "../Models/coupon.js";
import Claim from "../Models/claim.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "password";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function adminLogin(req, res) {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    // Generate a JWT token that expires in 2 hours

    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
}

export async function retrieveCoupons(req, res) {
  try {
    const coupons = await Coupon.find().sort({ order: 1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function addCoupon(req, res) {
  try {
    const { code, order } = req.body; // Get new coupon data from request body
    const coupon = new Coupon({ code, order });
    await coupon.save(); // Save the new coupon to the database
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function updateCoupon(req, res) {
  try {
    const updateData = req.body; // Get the fields to update from the request body
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function retrieveUserClaim(req, res) {
  try {
    const claims = await Claim.find()
      .populate("coupon")
      .sort({ claimedAt: -1 });
    // .populate("coupon") replaces the coupon ID with the actual coupon document details
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
