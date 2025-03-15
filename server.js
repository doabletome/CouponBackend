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

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api", CouponRouter);
app.use("/api/admin", adminRouter);
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
