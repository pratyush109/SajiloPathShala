
import bcrypt from "bcrypt";
import crypto from "crypto";
import Users from "../Model/userModel.js";
import { generateToken } from "../Security/jwt-utils.js";
import { sendEmail } from "../Utils/email.js";
import { sequelize } from "../Database/db.js"; 


export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const access_token = generateToken({ id: user.id, email: user.email, role: user.role, fullName: user.fullName });
res.status(200).json({
  message: "Login successful",
  data: {
    access_token,
    role: user.role,
    fullName: user.fullName,
    email: user.email,
    id: user.id
  },
});


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600 * 1000; 

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.fullName},</p>
      <p>Click the link below to reset your password. The link is valid for 1 hour.</p>
      <a href="${resetLink}">Reset Password</a>
    `;

    await sendEmail({ to: email, subject: "Reset Your Password", html: message });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) return res.status(400).json({ message: "Invalid request" });

    const user = await Users.findOne({ where: { resetToken: token } });
    if (!user) return res.status(400).json({ message: "Invalid token" });

    if (user.resetTokenExpiry < Date.now())
      return res.status(400).json({ message: "Token expired" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "fullName", "email", "role", "createdAt", "updatedAt"],
    });
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id, {
      attributes: ["id", "fullName", "email", "role", "createdAt", "updatedAt"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, role } = req.body;

    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      data: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete user safely along with their bookings
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete all bookings where this user is student or tutor
    await Booking.destroy({ where: { studentId: id } });
    await Booking.destroy({ where: { tutorId: id } });

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: "User and related bookings deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error); // Full error for debugging
    res.status(500).json({ message: "Something went wrong while deleting the user" });
  }
};
const createAdmin = async () => {
  await sequelize.sync(); 
  const existingAdmin = await Users.findOne({ where: { email: "admin@example.com" } });
  if (existingAdmin) {
    console.log("Admin already exists:", existingAdmin.id);
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10); 

  const admin = await Users.create({
    fullName: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created:", admin.id);
};

createAdmin();