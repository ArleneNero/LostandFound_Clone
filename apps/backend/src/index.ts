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
if (!process.env.VERCEL && process.env.NODE_ENV !== "production") {
  start();
}

/**
 * Serverless function entrypoint for Vercel deployment.
 * Bridges incoming Vercel/Node.js HTTP request and response into Fastify.
 * Also preserves Fastify instance properties for framework detection.
 */
const handler = async function (req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
};

Object.assign(handler, app);

export default handler;
export { app };

