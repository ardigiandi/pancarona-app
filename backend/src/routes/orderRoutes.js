import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getLatestActiveOrder,
  getOrderStatusById,
} from "../controllers/orderController.js";

const router = Router();

router.get("/latest", authenticate, getLatestActiveOrder);

router.post("/", authenticate ,createOrder);
router.get("/:id", authenticate, getOrderStatusById);


export default router;
