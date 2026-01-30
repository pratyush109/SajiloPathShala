
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

router.post("/register", register); 
router.post("/login", login);       


router.get("/users", getAllUsers);         
router.get("/users/:id", getUserById);     
router.put("/users/:id", updateUser);      
router.delete("/users/:id", deleteUser);    

export default router;
