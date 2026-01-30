import express from "express";
import { getAllUsers, updateUser } from "../Controller/authController.js";
import { getBookingsForUser, updateBookingStatus } from "../Controller/bookingController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/users", (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });
  next();
}, getAllUsers);

router.patch("/users/:id", (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });
  next();
}, updateUser);

router.get("/bookings", getBookingsForUser);
router.patch("/bookings/:id", updateBookingStatus);

export default router;
