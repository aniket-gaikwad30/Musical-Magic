import { Router, raw, json } from "express";
import { authCallback, syncUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", raw({ type: "application/json" }), authCallback);
router.post("/sync", json(), syncUser);

export default router;
