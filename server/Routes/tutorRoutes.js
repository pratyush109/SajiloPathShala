import express from "express";
import { authenticateToken } from "../middleware/token-middleware.js";
import {
  upsertTutorProfile,
  getAllTutors,
  getTutorProfile,
  getPendingBookings,
  getTutorStats,
} from "../Controller/tutorController.js";

const router = express.Router();


router.get("/", getAllTutors);

router.get("/profile", authenticateToken, getTutorProfile);
router.put("/profile", authenticateToken, upsertTutorProfile);

router.get("/pending-bookings", authenticateToken, getPendingBookings);
router.get("/stats", authenticateToken, getTutorStats);

export default router;
/*  */