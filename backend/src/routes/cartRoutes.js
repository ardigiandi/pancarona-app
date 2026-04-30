import { Router } from "express";
import {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();
router.use(authenticate);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateQty);
router.delete("/clear", clearCart);
router.delete("/:productId/:size", removeItem);

export default router;
