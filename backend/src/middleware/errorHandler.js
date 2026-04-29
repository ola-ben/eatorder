import { config } from "../config/env.js";

// 404 handler — must be mounted after all routes.
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}

// Centralized error handler — Express recognizes 4-arg signature.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const payload = {
    error: err.message || "Internal server error",
  };
  if (config.isDev && err.stack) {
    payload.stack = err.stack.split("\n");
  }
  if (status >= 500) {
    console.error("[error]", err);
  }
  res.status(status).json(payload);
}
