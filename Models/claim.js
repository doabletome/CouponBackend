import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    required: true,
  },

  ip: { type: String, required: true },
  cookieId: { type: String, required: true },
  claimedAt: { type: Date, default: Date.now },
});

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;
