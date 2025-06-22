import { Router } from "express";
import { authCallback, syncUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", authCallback);
router.post("/sync", syncUser);

export default router;
