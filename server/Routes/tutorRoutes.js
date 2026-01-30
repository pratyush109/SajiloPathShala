import express from "express";
import {
  upsertTutorProfile,
  getAllTutors,
  getTutorProfile
} from "../Controller/tutorController.js";
import { authenticateToken } from "../middleware/token-middleware.js";

const router = express.Router();


router.get("/", getAllTutors);


router.get("/profile", authenticateToken, getTutorProfile);
router.put("/profile", authenticateToken, upsertTutorProfile);

export default router;
