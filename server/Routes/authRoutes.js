import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../Controller/authController.js";

import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);




router.get("/users", authenticateToken, getAllUsers);

router.get("/users/:id", authenticateToken, getUserById);

router.put("/users/:id", authenticateToken, updateUser);

router.delete("/users/:id", authenticateToken, deleteUser);

export default router;
/*  */