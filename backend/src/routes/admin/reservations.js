import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  listReservations,
  getReservation,
  updateReservationStatus,
} from "../../controllers/admin/reservationsController.js";

const router = Router();

router.get("/", asyncHandler(listReservations));
router.get("/:id", asyncHandler(getReservation));
router.patch("/:id/status", asyncHandler(updateReservationStatus));

export default router;
