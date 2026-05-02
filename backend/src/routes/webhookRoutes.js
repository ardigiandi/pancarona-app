import { Router } from "express";
import { xenditWebhook } from "../controllers/webhookController.js";

const router = Router();
router.post("/xendit", xenditWebhook);

export default router;