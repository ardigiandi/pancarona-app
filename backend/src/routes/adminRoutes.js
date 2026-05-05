import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  getMe,
} from "../controllers/admin/authAdminController.js";
import { authenticateAdmin } from "../middleware/adminMiddleware.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/admin/productAdminController.js";
import {
  getActivities,
  getDashboard,
  getWeeklyRevenue,
} from "../controllers/admin/dashboardAdminController.js";
import {
  getUsers,
  deleteUser,
} from "../controllers/admin/userAdminController.js";
import {
  getOrders,
  updateOrderStatus,
} from "../controllers/admin/orderAdminController.js";
import {
  updateAdminPassword,
  updateAdminProfile,
} from "../controllers/admin/authAdminController.js";
import { upload } from "../lib/cloudinary.js";

const router = Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.use(authenticateAdmin);

router.get("/me", getMe);

router.get("/dashboard", getDashboard);
router.post("/products", upload.array("images", 5), createProduct);
router.get("/weekly-revenue", getWeeklyRevenue);
router.get("/activities", getActivities);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.get("/products", getProduct);

router.get("/orders", getOrders);
router.put("/orders/:id", updateOrderStatus);

router.put("/profile", updateAdminProfile);
router.put("/password", updateAdminPassword);

export default router;
