import { Router } from "express";
import {
  getProducts,
  getProductBySlug,
} from "../controllers/productController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export default router;
