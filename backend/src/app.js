import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin(origin, cb) {
        // Allow non-browser callers (curl, server-to-server) and any whitelisted origin.
        if (!origin) return cb(null, true);
        if (config.corsOrigins.length === 0 || config.corsOrigins.includes(origin)) {
          return cb(null, true);
        }
        cb(new Error(`CORS blocked: ${origin}`));
      },
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(config.isDev ? "dev" : "combined"));

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
