import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  listOrders,
  getOrder,
  updateOrderStatus,
} from "../../controllers/admin/ordersController.js";

const router = Router();

router.get("/", asyncHandler(listOrders));
router.get("/:id", asyncHandler(getOrder));
router.patch("/:id/status", asyncHandler(updateOrderStatus));

export default router;
