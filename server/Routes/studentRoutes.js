import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentBookings,
} from "../Controller/studentController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import { cancelBooking, rescheduleBooking } from "../Controller/studentController.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);
router.get("/bookings", getStudentBookings);
router.patch("/cancel/:id", cancelBooking);
router.patch("/reschedule/:id", rescheduleBooking);


export default router;


/*  */