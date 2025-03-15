import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  available: { type: Boolean, default: true },
  claimed: { type: Boolean, default: false },
  claimedAt: { type: Date },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
