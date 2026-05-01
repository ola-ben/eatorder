import { supabaseAdmin } from "../../db/supabase.js";

function toAdminRow(row) {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    restaurantName: row.restaurant_name,
    customer: row.full_name,
    phone: row.phone,
    email: row.email,
    date: row.reserved_date,
    time: row.reserved_time,
    partySize: row.party_size,
    note: row.note,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function listReservations(req, res) {
  const { status } = req.query;

  let query = supabaseAdmin
    .from("reservations")
    .select(
      `id, restaurant_id, restaurant_name, full_name, phone, email,
       reserved_date, reserved_time, party_size, note, status, created_at`,
    )
    .order("reserved_date", { ascending: false })
    .order("reserved_time", { ascending: false });

  if (status) query = query.ilike("status", status);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  const reservations = (data ?? []).map(toAdminRow);
  res.json({ reservations, total: reservations.length });
}

export async function getReservation(req, res) {
  const { data, error } = await supabaseAdmin
    .from("reservations")
    .select(
      `id, restaurant_id, restaurant_name, full_name, phone, email,
       reserved_date, reserved_time, party_size, note, status, created_at`,
    )
    .eq("id", req.params.id)
    .single();

  if (error) {
    const code = error.code === "PGRST116" ? 404 : 500;
    return res.status(code).json({ error: error.message });
  }

  res.json({ reservation: toAdminRow(data) });
}

export async function updateReservationStatus(req, res) {
  const { status } = req.body;
  const allowed = ["Pending", "Confirmed", "Cancelled", "Completed"];
  if (!allowed.includes(status)) {
    return res
      .status(400)
      .json({ error: `Status must be one of: ${allowed.join(", ")}` });
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", req.params.id)
    .select(
      `id, restaurant_id, restaurant_name, full_name, phone, email,
       reserved_date, reserved_time, party_size, note, status, created_at`,
    )
    .single();

  if (error) {
    const code = error.code === "PGRST116" ? 404 : 500;
    return res.status(code).json({ error: error.message });
  }

  res.json({ reservation: toAdminRow(data) });
}
