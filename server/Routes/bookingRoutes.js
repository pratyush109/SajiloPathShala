import express from "express";
import {
  createBooking,
  getBookingsForUser,
  updateBookingStatus,
} from "../Controller/bookingController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();


router.post("/", authenticateToken, createBooking);


router.get("/", authenticateToken, getBookingsForUser);


router.patch("/:id", authenticateToken, updateBookingStatus);

export default router;
