import { supabaseAdmin } from "../../db/supabase.js";

// Maps a Supabase row → the admin Orders table format.
function toAdminRow(row) {
  return {
    id: row.id,
    customer: row.full_name,
    email: row.email,
    phone: row.phone,
    total: Number(row.total_price),
    status: row.status,
    delivery: row.delivery_method,
    address: row.address,
    note: row.note,
    items: (row.items ?? []).length,
    createdAt: row.created_at,
  };
}

export async function listOrders(req, res) {
  const { status } = req.query;

  let query = supabaseAdmin
    .from("orders")
    .select(
      `id, full_name, email, phone, total_price, status,
       delivery_method, address, note, created_at,
       items:order_items ( id )`,
    )
    .order("created_at", { ascending: false });

  if (status) {
    // case-insensitive match
    query = query.ilike("status", status);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  const orders = (data ?? []).map(toAdminRow);
  res.json({ orders, total: orders.length });
}

export async function getOrder(req, res) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `id, full_name, email, phone, total_price, status,
       delivery_method, address, note, created_at,
       items:order_items ( name, price, quantity, photo_name, ingredients )`,
    )
    .eq("id", req.params.id)
    .single();

  if (error) {
    const code = error.code === "PGRST116" ? 404 : 500;
    return res.status(code).json({ error: error.message });
  }

  res.json({
    order: {
      id: data.id,
      customer: data.full_name,
      email: data.email,
      phone: data.phone,
      total: Number(data.total_price),
      status: data.status,
      delivery: data.delivery_method,
      address: data.address,
      note: data.note,
      createdAt: data.created_at,
      items: (data.items ?? []).map((it) => ({
        name: it.name,
        price: Number(it.price),
        quantity: it.quantity,
        photoName: it.photo_name,
        ingredients: it.ingredients,
      })),
    },
  });
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body;
  const allowed = ["Pending", "Processing", "Delivered", "Cancelled"];
  if (!allowed.includes(status)) {
    return res
      .status(400)
      .json({ error: `Status must be one of: ${allowed.join(", ")}` });
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", req.params.id)
    .select(
      `id, full_name, total_price, status, created_at,
       items:order_items ( id )`,
    )
    .single();

  if (error) {
    const code = error.code === "PGRST116" ? 404 : 500;
    return res.status(code).json({ error: error.message });
  }

  res.json({ order: toAdminRow(data) });
}
