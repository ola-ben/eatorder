import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  listUsers,
  setUserRole,
} from "../../controllers/admin/usersController.js";

const router = Router();

router.get("/", asyncHandler(listUsers));
router.patch("/:id/role", asyncHandler(setUserRole));

export default router;
