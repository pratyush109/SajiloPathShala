// routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controller/authController.js";

const router = express.Router();

// Auth routes
router.post("/register", register); // register new user
router.post("/login", login);       // login user

// CRUD routes for users
router.get("/users", getAllUsers);          // get all users
router.get("/users/:id", getUserById);      // get user by id
router.put("/users/:id", updateUser);       // update user
router.delete("/users/:id", deleteUser);    // delete user

export default router;
