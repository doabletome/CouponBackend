import { Router } from "express";
import { claimCoupon } from "../Controllers/couponControllers.js";

const CouponRouter = Router();

CouponRouter.post("/claim", claimCoupon);

export default CouponRouter;
