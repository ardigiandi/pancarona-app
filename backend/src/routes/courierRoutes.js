import { Router } from "express";
import {
  takeOrder,
  updateLocation,
  updateStatus,
} from "../controllers/couriers/courierController.js";
import {
  loginCourier,
  registerCourier,
} from "../controllers/couriers/authCourierController.js";

const router = Router();

router.patch("/order/:orderId/status", updateStatus);
router.post("/order/location", updateLocation);
router.post("/auth/register", registerCourier);
router.post("/auth/login", loginCourier);

router.put("/take-order/:orderId", takeOrder);

export default router;
