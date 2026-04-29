import { supabaseAdmin } from "../../db/supabase.js";

// TODO: replace mock data with real queries once you create an `orders` table in Supabase.
// Example:
//   const { data, error } = await supabaseAdmin
//     .from("orders")
//     .select("*, items:order_items(*)")
//     .order("created_at", { ascending: false });

// Mock data cleared — orders will appear here once they're written to a real
// Supabase `orders` table and this controller is rewired to query it.
const mockOrders = [];

export async function listOrders(req, res) {
  // Optional filter ?status=Processing
  const { status } = req.query;
  const orders = status
    ? mockOrders.filter((o) => o.status.toLowerCase() === status.toLowerCase())
    : mockOrders;

  res.json({ orders, total: orders.length });
}

export async function getOrder(req, res) {
  const order = mockOrders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ order });
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body;
  const allowed = ["Pending", "Processing", "Delivered", "Cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(", ")}` });
  }
  const order = mockOrders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  order.status = status;
  res.json({ order });
}
