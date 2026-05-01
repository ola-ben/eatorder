import { supabase } from "./supabase";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    /* non-JSON response is fine for HEAD/204 */
  }

  if (!res.ok) {
    const message = payload?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export const adminApi = {
  health: () => request("/health"),
  me: () => request("/me"),
  listOrders: (status) =>
    request(`/admin/orders${status ? `?status=${encodeURIComponent(status)}` : ""}`),
  getOrder: (id) => request(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) =>
    request(`/admin/orders/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
  listRestaurants: () => request("/admin/restaurants"),
  toggleRestaurantOpen: (id) =>
    request(`/admin/restaurants/${id}/open`, { method: "PATCH" }),
  listUsers: () => request("/admin/users"),
  setUserRole: (id, role) =>
    request(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: { role },
    }),
  listReservations: (status) =>
    request(
      `/admin/reservations${status ? `?status=${encodeURIComponent(status)}` : ""}`,
    ),
  getReservation: (id) => request(`/admin/reservations/${id}`),
  updateReservationStatus: (id, status) =>
    request(`/admin/reservations/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};
