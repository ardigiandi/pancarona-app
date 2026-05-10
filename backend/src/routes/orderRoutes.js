import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrderStatus,
  getOrderStatusById,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);
router.get("/status", authenticate, getOrderStatus);
router.get("/:id", authenticate, getOrderStatusById);

export default router;
