import mongoose from "mongoose";
import dotenv from "dotenv";
import Coupon from "./Models/coupon.js";

dotenv.config();

const sampleCoupons = [
  { code: "SAVE10", order: 1 },
  { code: "WELCOME15", order: 2 },
  { code: "DISCOUNT20", order: 3 },
  { code: "DEAL25", order: 4 },
];

async function seedDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to DB Successful");

    await Coupon.deleteMany({});
    console.log("All data in Coupon collection is removed");

    await Coupon.insertMany(sampleCoupons);
    console.log("Data intialised");

    process.exit();
  } catch (error) {
    console.log("unable to Connect to DB", error.message);
    process.exit(1);
  }
}

seedDb();
