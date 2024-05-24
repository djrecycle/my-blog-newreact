import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { generateAiContent } from "../controllers/generateai.controller.js";

const router = express.Router();

// Menggunakan GET karena asumsi hanya mengambil data
router.get("/ai/content", verifyToken, generateAiContent);

export default router;
