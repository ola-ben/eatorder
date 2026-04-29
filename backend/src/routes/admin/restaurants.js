import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  listRestaurants,
  toggleRestaurantOpen,
} from "../../controllers/admin/restaurantsController.js";

const router = Router();

router.get("/", asyncHandler(listRestaurants));
router.patch("/:id/open", asyncHandler(toggleRestaurantOpen));

export default router;
