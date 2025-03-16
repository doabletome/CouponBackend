import express from "express";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./Connection/mongo.js";
import CouponRouter from "./Routes/couponRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173", // For local testing
  "https://coupon-frontend-green.vercel.app", // Your deployed frontend URL
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication
  })
);
app.use("/api", CouponRouter);
app.use("/api/admin", adminRouter);
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
