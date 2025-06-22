import { Router, raw } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", raw({ type: "application/json" }), authCallback);

export default router;
