import { supabase } from "./supabase";

// ── Customer-side orders API ────────────────────────────────
// Reads/writes go directly to Supabase from the browser.
// RLS enforces that a user only sees their own orders.

export async function createOrder({
  fullName,
  phone,
  email,
  deliveryMethod, // 'pickup' | 'delivery'
  address,
  note,
  totalPrice,
  items, // [{ name, price, quantity, photoName, ingredients }]
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: { message: "You need to be signed in to place an order." } };
  }

  const id = `ORD-${Date.now().toString().slice(-8)}`;

  // Insert the order row first
  const { error: orderError } = await supabase.from("orders").insert({
    id,
    user_id: user.id,
    full_name: fullName,
    phone,
    email,
    delivery_method: deliveryMethod,
    address: deliveryMethod === "delivery" ? address : null,
    note: note || null,
    total_price: totalPrice,
    status: "Processing",
  });
  if (orderError) return { error: orderError };

  // Then insert the items
  if (items?.length) {
    const rows = items.map((item) => ({
      order_id: id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      photo_name: item.photoName ?? null,
      ingredients: item.ingredients ?? null,
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(rows);
    if (itemsError) {
      // Roll back the parent row if items failed
      await supabase.from("orders").delete().eq("id", id);
      return { error: itemsError };
    }
  }

  return {
    data: {
      id,
      user_id: user.id,
      fullName,
      phone,
      email,
      delivery: deliveryMethod,
      address: deliveryMethod === "delivery" ? address : "Pickup from store",
      note,
      totalPrice,
      items,
      date: new Date().toLocaleDateString(),
      status: "Processing",
    },
  };
}

// Returns orders for the current user, newest first, with their items joined in.
export async function listMyOrders({ limit } = {}) {
  let query = supabase
    .from("orders")
    .select(
      `id, status, total_price, full_name, phone, email,
       delivery_method, address, note, created_at,
       items:order_items ( name, price, quantity, photo_name, ingredients )`,
    )
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) return { error };

  return { data: (data ?? []).map(toClientOrder) };
}

export async function countMyOrders() {
  const { count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });
  if (error) return { error, count: 0 };
  return { count: count ?? 0 };
}

// Maps a Supabase row into the shape the existing UI expects.
function toClientOrder(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    delivery: row.delivery_method,
    address:
      row.delivery_method === "delivery" ? row.address : "Pickup from store",
    note: row.note,
    totalPrice: Number(row.total_price),
    status: row.status,
    date: new Date(row.created_at).toLocaleDateString(),
    items: (row.items ?? []).map((it) => ({
      name: it.name,
      price: Number(it.price),
      quantity: it.quantity,
      photoName: it.photo_name,
      ingredients: it.ingredients,
    })),
  };
}
