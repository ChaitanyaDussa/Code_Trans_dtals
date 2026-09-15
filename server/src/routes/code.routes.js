import { Router } from "express";
import {
  translate,
  analyze,
  optimize,
  explain,
} from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// All code routes need the user to be logged in
router.use(authenticate);

router.post("/translate", translate);
router.post("/analyze", analyze);
router.post("/optimize", optimize);
router.post("/explain", explain);

export default router;
