import { supabase } from "./supabase";

// ── Customer-side reservations API ──────────────────────────
// Reads/writes go directly to Supabase from the browser.
// RLS enforces that a user only sees their own reservations.

export async function createReservation({
  restaurantId,
  restaurantName,
  fullName,
  phone,
  email,
  reservedDate, // 'YYYY-MM-DD'
  reservedTime, // 'HH:mm'
  partySize,
  note,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: { message: "You need to be signed in to book a table." },
    };
  }

  const id = `RES-${Date.now().toString().slice(-8)}`;

  const { error } = await supabase.from("reservations").insert({
    id,
    user_id: user.id,
    restaurant_id: restaurantId,
    restaurant_name: restaurantName,
    full_name: fullName,
    phone,
    email: email || null,
    reserved_date: reservedDate,
    reserved_time: reservedTime,
    party_size: partySize,
    note: note || null,
    status: "Pending",
  });
  if (error) return { error };

  return {
    data: {
      id,
      restaurantId,
      restaurantName,
      fullName,
      phone,
      email,
      reservedDate,
      reservedTime,
      partySize,
      note,
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
  };
}

export async function listMyReservations({ limit } = {}) {
  let query = supabase
    .from("reservations")
    .select(
      `id, restaurant_id, restaurant_name, full_name, phone, email,
       reserved_date, reserved_time, party_size, note, status, created_at`,
    )
    .order("reserved_date", { ascending: false })
    .order("reserved_time", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) return { error };

  return { data: (data ?? []).map(toClient) };
}

export async function countMyReservations() {
  const { count, error } = await supabase
    .from("reservations")
    .select("*", { count: "exact", head: true });
  if (error) return { error, count: 0 };
  return { count: count ?? 0 };
}

// Customer cancels their own reservation. RLS allows this since auth.uid() matches.
export async function cancelMyReservation(id) {
  const { data, error } = await supabase
    .from("reservations")
    .update({ status: "Cancelled" })
    .eq("id", id)
    .select()
    .single();
  if (error) return { error };
  return { data: toClient(data) };
}

function toClient(row) {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    restaurantName: row.restaurant_name,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    reservedDate: row.reserved_date,
    reservedTime: row.reserved_time,
    partySize: row.party_size,
    note: row.note,
    status: row.status,
    createdAt: row.created_at,
  };
}
