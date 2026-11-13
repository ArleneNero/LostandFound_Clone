import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

async function start() {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`🚀 UBL LostnFound Backend API running on port ${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (!process.env.VERCEL) {
  start();
}

/**
 * Serverless Request Handler for Vercel
 * Handles incoming HTTP requests by delegating to Fastify once it is ready.
 */
export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}

export { app };
