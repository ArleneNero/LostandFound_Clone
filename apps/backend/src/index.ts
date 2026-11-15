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
if (
  !process.env.VERCEL &&
  process.env.NODE_ENV !== "production" &&
  !process.env.AWS_LAMBDA_FUNCTION_NAME
) {
  start();
}

/**
 * Serverless function entrypoint for Vercel deployment.
 * Bridges incoming Vercel/Node.js HTTP request and response into Fastify.
 * Awaits full response completion so the serverless execution does not terminate prematurely.
 */
const handler = async function (req: any, res: any) {
  try {
    await app.ready();
    await new Promise<void>((resolve, reject) => {
      res.on("finish", resolve);
      res.on("close", resolve);
      res.on("error", reject);
      app.server.emit("request", req, res);
    });
  } catch (err: any) {
    console.error("[SERVERLESS_HANDLER_ERROR]:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: err?.message || "Internal serverless error",
          },
        })
      );
    }
  }
};

Object.assign(handler, app);

export default handler;
export { app };

