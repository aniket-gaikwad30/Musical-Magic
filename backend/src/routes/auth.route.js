import { Router, raw } from "express";
import { authCallback, syncUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", raw({ type: "application/json" }), authCallback);
router.post("/sync", syncUser);

export default router;
