// Requires that req.user has role === 'admin'.
// Set the role in Supabase: Authentication → Users → click a user → Raw User Metadata
// add { "role": "admin" }, OR use service role to update user_metadata.
export function requireAdmin(req, res, next) {
  const role =
    req.user?.app_metadata?.role || req.user?.user_metadata?.role;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ error: "Admin access required" });
  }
  next();
}
