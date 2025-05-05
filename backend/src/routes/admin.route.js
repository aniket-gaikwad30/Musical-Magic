import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controller/admin.controller.js";
import { get } from "mongoose";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", requireAdmin, checkAdmin);

router.post("/songs", createSong);
router.delete("/somgs/:id", deleteSong);

router.post("/albums", createSong);
router.delete("/albums/:id", deleteSong);

export default router;
