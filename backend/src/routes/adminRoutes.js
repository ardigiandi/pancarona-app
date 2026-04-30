import { Router } from "express";
import { adminLogin } from "../controllers/admin/authAdminController.js";
import { authenticateAdmin } from "../middleware/adminMiddleware.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin/productAdminController.js";
import { upload } from "../lib/cloudinary.js";

const router = Router();

router.post("/login", adminLogin);
router.post("/products", upload.array("images", 5), createProduct);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

router.use(authenticateAdmin);

export default router;
