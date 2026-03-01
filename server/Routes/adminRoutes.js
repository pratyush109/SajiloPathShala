import express from "express";
import Users from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";
import { authenticateToken } from "../middleware/token-middleware.js";
import TutorProfile from "../Model/tutorProfileModel.js";
const router = express.Router();

router.use(authenticateToken);


router.get("/users", async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const users = await Users.findAll({
      attributes: ["id", "fullName", "email", "role", "createdAt", "updatedAt"],
    });
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/users/:id", async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const { fullName, email, role, password } = req.body;
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = password; 

    await user.save();
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    await Booking.destroy({ where: { studentId: user.id } });
    await Booking.destroy({ where: { tutorId: user.id } });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});


router.get("/bookings", async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Users, as: "student", attributes: ["fullName"] },
        { model: Users, as: "tutor", attributes: ["fullName"] },
      ],
    });
    res.status(200).json({ data: bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;