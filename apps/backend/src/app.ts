import Fastify, { FastifyInstance, FastifyError, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { env } from "./config/env.js";
import { postsRoutes } from "./modules/posts/posts.routes.js";
import { itemsRoutes } from "./modules/items/items.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { uploadsRoutes } from "./modules/uploads/uploads.routes.js";
import { officerRoutes } from "./modules/officer/officer.routes.js";
import { submissionsRoutes } from "./modules/submissions/submissions.routes.js";
import { r2Provider } from "./modules/uploads/storage/r2.provider.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "test" ? "silent" : "info",
      redact: [
        "req.headers.authorization",
        "req.headers.cookie",
        "*.email",
        "*.student_number",
        "*.token",
      ],
    },
    genReqId: (req) => (req.headers["x-request-id"] as string) || randomUUID(),
    requestIdHeader: "x-request-id",
  });

  // Support binary content types for direct image PUT simulation
  app.addContentTypeParser(
    ["image/jpeg", "image/png", "image/webp", "application/octet-stream"],
    { parseAs: "buffer" },
    (_req, body, done) => {
      done(null, body);
    }
  );

  // CORS (Allow Frontend, Swagger Editor, and Local Development)
  app.register(cors, {
    origin: (origin, cb) => {
      cb(null, true);
    },
    credentials: true,
  });

  // Support Chrome Private Network Access (PNA)
  app.addHook("onSend", async (_request, reply) => {
    reply.header("Access-Control-Allow-Private-Network", "true");
  });

  // Uniform Error Envelope: { error: { code, message, request_id } }
  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error);
    const statusCode = error.statusCode || 500;
    const code = error.code || (statusCode === 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST");
    const message = statusCode === 500 ? "Terjadi kesalahan internal server" : error.message;

    reply.status(statusCode).send({
      error: {
        code,
        message,
        request_id: request.id,
      },
    });
  });

  // OpenAPI YAML contract endpoint
  app.get("/openapi.yaml", async (_request, reply) => {
    const possiblePaths = [
      path.resolve(process.cwd(), ".agent-internal/contracts/openapi-v1.0.yaml"),
      path.resolve(process.cwd(), "apps/backend/.agent-internal/contracts/openapi-v1.0.yaml"),
    ];
    const yamlPath = possiblePaths.find((p) => fs.existsSync(p));
    if (!yamlPath) {
      return reply.status(404).send({ error: "OpenAPI contract not found" });
    }
    reply.header("Content-Type", "text/yaml; charset=utf-8");
    return reply.send(fs.createReadStream(yamlPath));
  });

  // Native Local Swagger UI (No CORS, No Mixed Content, 100% Local!)
  app.get("/docs", async (_request, reply) => {
    reply.header("Content-Type", "text/html; charset=utf-8");
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CampusFind API Documentation — Swagger UI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; padding: 0; background: #fafafa; }
    .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/openapi.yaml',
        dom_id: '#swagger-ui',
        deepLinking: true,
      });
    };
  </script>
</body>
</html>`;
  });

  // Health check endpoint (Internal)
  const healthHandler = async (request: FastifyRequest) => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    request_id: request.id,
  });
  app.get("/health", healthHandler);
  app.get("/api/v1/health", healthHandler);


  // Storage endpoint: stream live from Cloudflare R2 bucket with local fallback
  app.get<{ Params: { "*": string } }>("/storage/*", async (request, reply) => {
    const rawKey = request.params["*"];
    if (!rawKey) return reply.status(404).send({ error: "Not Found" });
    const safeKey = rawKey.replace(/^(\.\.[\/\\])+/, "");

    // 1. Live stream directly from Cloudflare R2
    if (r2Provider.isConfigured) {
      try {
        const stream = await r2Provider.getObjectStream(safeKey);
        if (stream && stream.body) {
          reply.header("Content-Type", stream.contentType);
          return reply.send(stream.body);
        }
      } catch (err) {
        request.log.warn({ err }, "R2 stream error, falling back to local storage");
      }
    }

    // 2. Local filesystem fallback
    const fullPath = path.resolve(process.cwd(), "storage", safeKey);
    if (!fs.existsSync(fullPath)) {
      return reply.status(404).send({ error: "File not found" });
    }
    const ext = path.extname(fullPath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    };
    reply.header("Content-Type", mimeTypes[ext] || "application/octet-stream");
    return reply.send(fs.createReadStream(fullPath));
  });

  // APIs (/api/v1)
  app.register(postsRoutes, { prefix: "/api/v1" });
  app.register(itemsRoutes, { prefix: "/api/v1" });
  app.register(authRoutes, { prefix: "/api/v1" });
  app.register(uploadsRoutes, { prefix: "/api/v1" });
  app.register(officerRoutes, { prefix: "/api/v1" });
  app.register(submissionsRoutes, { prefix: "/api/v1" });

  return app;
}
