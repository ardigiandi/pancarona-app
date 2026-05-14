import { Router } from "express";
import {
  takeOrder,
  updateLocation,
  updateStatus,
  getAvailableOrders,
} from "../controllers/couriers/courierController.js";
import {
  loginCourier,
  registerCourier,
  getCourierProfile,
  logoutCourier,
} from "../controllers/couriers/authCourierController.js";

const router = Router();

router.patch("/order/:orderId/status", updateStatus);
router.post("/order/location", updateLocation);
router.post("/auth/register", registerCourier);
router.post("/auth/login", loginCourier);
router.get("/me", getCourierProfile);
router.post("/logout", logoutCourier);

router.put("/take-order/:orderId", takeOrder);

router.get("/orders/available", getAvailableOrders);

export default router;
