import { Router } from "express";
import authRoutes from "./auth.routes.js";
import codeRoutes from "./code.routes.js";
import historyRoutes from "./history.routes.js";

const router = Router();

router.get("/health", (req, res) => {
	res.status(200).json({ success: true, status: "ok" });
});

router.use("/auth", authRoutes); // → /api/auth/...
router.use("/code", codeRoutes); // → /api/code/...
router.use("/history", historyRoutes); // → /api/history/...

export default router;
