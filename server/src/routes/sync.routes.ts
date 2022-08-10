import { Router } from "express";
import { SyncPullController } from "../modules/sync/useCases/sync/SyncPullController";

const syncRoutes = Router();

const syncPullController = new SyncPullController();

syncRoutes.get("/pull", syncPullController.handle);

export { syncRoutes };
