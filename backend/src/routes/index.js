import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

import healthRoutes from "./health.js";
import adminOrders from "./admin/orders.js";
import adminRestaurants from "./admin/restaurants.js";
import adminUsers from "./admin/users.js";
import adminReservations from "./admin/reservations.js";

const router = Router();

// Public
router.use("/health", healthRoutes);

// Whoami — handy for the frontend to confirm token + role
router.get("/me", authenticate, (req, res) => {
  const role =
    req.user?.app_metadata?.role || req.user?.user_metadata?.role || "customer";
  res.json({
    id: req.user.id,
    email: req.user.email,
    role,
    fullName: req.user.user_metadata?.full_name ?? null,
  });
});

// Admin (gated by both auth + admin role)
const adminGate = [authenticate, requireAdmin];
router.use("/admin/orders", adminGate, adminOrders);
router.use("/admin/restaurants", adminGate, adminRestaurants);
router.use("/admin/users", adminGate, adminUsers);
router.use("/admin/reservations", adminGate, adminReservations);

export default router;
