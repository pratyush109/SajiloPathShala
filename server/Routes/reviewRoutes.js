import express from "express";
import { authenticateToken } from "../middleware/token-middleware.js";
import { createReview, getTutorReviews } from "../Controller/reviewController.js";

const router = express.Router();

router.post("/", authenticateToken, createReview);
router.get("/:tutorId", getTutorReviews);

export default router;
