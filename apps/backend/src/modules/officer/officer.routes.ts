import type { FastifyPluginAsync } from "fastify";
import { officerInventoryRoutes } from "./routes/officer-inventory.routes.js";
import { officerSubmissionsRoutes } from "./routes/officer-submissions.routes.js";
import { officerDispositionRoutes } from "./routes/officer-disposition.routes.js";

/**
 * Aggregator plugin registering officer sub-routes
 */
export const officerRoutes: FastifyPluginAsync = async (app) => {
  await app.register(officerInventoryRoutes);
  await app.register(officerSubmissionsRoutes);
  await app.register(officerDispositionRoutes);
};
