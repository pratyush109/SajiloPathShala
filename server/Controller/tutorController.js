import TutorProfile from "../Model/tutorProfileModel.js";
import User from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";
import { Op } from "sequelize";

/* ===============================
   GET ALL TUTORS (SEARCH & FILTER)
================================ */
export const getAllTutors = async (req, res) => {
  try {
    const { search, subject, rating } = req.query;
    const where = {};

    if (subject) {
      where.subjects = { [Op.contains]: [subject] };
    }

    if (rating && Number(rating) > 0) {
      where.rating = { [Op.gte]: Number(rating) };
    }

    const tutors = await TutorProfile.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "email"],
          where: {
            role: "tutor",
            ...(search && {
              fullName: { [Op.iLike]: `%${search}%` },
            }),
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   GET LOGGED-IN TUTOR PROFILE
================================ */
export const getTutorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await TutorProfile.findOne({
      where: { userId },
      include: {
        model: User,
        attributes: ["fullName", "email"],
      },
    });

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // We send a flat object so the Frontend Zod Schema can read it easily
    res.status(200).json({
      fullName: profile.User?.fullName || "",
      email: profile.User?.email || "",
      bio: profile.bio,
      subjects: profile.subjects,
      hourlyRate: profile.hourlyRate,
      experience: profile.experience,
      availability: profile.availability,
      rating: profile.rating || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   CREATE or UPDATE Tutor Profile
================================ */
export const upsertTutorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // DEBUG: This helps you see if the data is actually arriving in your terminal
    console.log("Incoming Request Body:", req.body);

    // Destructure data. We also check if the frontend sent it inside a 'data' wrapper.
    const body = req.body.data ? req.body.data : req.body;
    const { fullName, bio, subjects, hourlyRate, experience, availability } = body;

    // 1. STACKED VALIDATION
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ message: "Full Name is required" });
    }

    // 2. UPDATE USER TABLE (Name change)
    await User.update({ fullName }, { where: { id: userId } });

    // 3. UPSERT TUTOR PROFILE
    let profile = await TutorProfile.findOne({ where: { userId } });
    
    const tutorData = {
      bio,
      subjects,
      hourlyRate: Number(hourlyRate), // Ensure it's a number
      experience: Number(experience), // Ensure it's a number
      availability,
    };

    if (profile) {
      await profile.update(tutorData);
    } else {
      profile = await TutorProfile.create({
        userId,
        ...tutorData,
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: { ...profile.toJSON(), fullName },
    });
  } catch (error) {
    console.error("Upsert Error:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};

/* ===============================
   GET PENDING BOOKINGS
================================ */
export const getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { tutorId: req.user.id, status: "PENDING" },
      include: [{ model: User, as: "student", attributes: ["fullName", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

/* ===============================
   TUTOR DASHBOARD STATS
================================ */
export const getTutorStats = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const totalStudents = await Booking.count({ where: { tutorId }, distinct: true, col: "studentId" });
    const today = new Date().toISOString().split("T")[0];
    const sessionsToday = await Booking.count({ where: { tutorId, date: today } });
    const completedSessions = await Booking.count({ where: { tutorId, status: "COMPLETED" } });

    res.status(200).json({ totalStudents, sessionsToday, completedSessions });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
};