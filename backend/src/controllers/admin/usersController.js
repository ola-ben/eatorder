import { supabaseAdmin } from "../../db/supabase.js";

// Lists Supabase auth users using the admin API (requires service-role key).
export async function listUsers(req, res) {
  const page = Number(req.query.page) || 1;
  const perPage = Math.min(Number(req.query.perPage) || 50, 200);

  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const users = (data?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.user_metadata?.full_name ?? null,
    role: u.app_metadata?.role || u.user_metadata?.role || "customer",
    createdAt: u.created_at,
    lastSignIn: u.last_sign_in_at,
  }));

  res.json({ users, total: users.length, page });
}

export async function setUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  const allowed = ["admin", "customer"];
  if (!allowed.includes(role)) {
    return res.status(400).json({ error: `Role must be one of: ${allowed.join(", ")}` });
  }

  // Update app_metadata so it cannot be changed by the user themselves.
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
    app_metadata: { role },
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      role: data.user.app_metadata?.role,
    },
  });
}
