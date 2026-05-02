import { Router } from "express";
import { createCheckout } from "../controllers/checkoutController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/", authenticate, createCheckout);

export default router;