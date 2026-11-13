import Fastify from "fastify";
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

// Local server startup
if (!process.env.VERCEL) {
  start();
}

/**
 * Export default Fastify instance for Vercel Fastify Framework integration.
 */
export default app;
export { app };

