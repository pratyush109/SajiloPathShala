import express from "express";
import {
  upsertTutorProfile,
  getAllTutors,
  getTutorProfile
} from "../Controller/tutorController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import { getPendingBookings, getTutorStats } from "../Controller/tutorController.js";


const router = express.Router();


router.get("/", getAllTutors);


router.get("/profile", authenticateToken, getTutorProfile);
router.put("/profile", authenticateToken, upsertTutorProfile);
router.get("/pending-bookings", getPendingBookings);
router.get("/stats", getTutorStats);
export default router;
