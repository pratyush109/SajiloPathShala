import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentBookings,
} from "../Controller/studentController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);
router.get("/bookings", getStudentBookings);

export default router;
