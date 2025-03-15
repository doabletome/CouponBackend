import { Router } from "express";
import {
  adminLogin,
  retrieveCoupons,
  retrieveUserClaim,
  updateCoupon,
  addCoupon,
} from "../Controllers/adminControllers.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const adminRouter = Router();

// Middleware to protect admin routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    jwt.verify(token, JWT_SECRET); // Verify the token using the secret
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// admin Login
adminRouter.post("/login", adminLogin);

// GET /api/admin/coupons – Retrieve all coupons
adminRouter.get("/coupons", authMiddleware, retrieveCoupons);

// POST /api/admin/coupons – Add a new coupon
adminRouter.post("/coupons", authMiddleware, addCoupon);

// PUT /api/admin/coupons/:id – Update coupon details or toggle availability
adminRouter.put("/coupons/:id", authMiddleware, updateCoupon);

// GET /api/admin/claims – Retrieve user claim history
adminRouter.get("/claims", authMiddleware, retrieveUserClaim);

export default adminRouter;
