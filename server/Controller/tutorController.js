import TutorProfile from "../Model/tutorProfileModel.js";
import User from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";
import { Op } from "sequelize";

/* ===============================
   CREATE or UPDATE Tutor Profile
================================ */
export const upsertTutorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { bio, subjects, hourlyRate, experience, availability } = req.body;

    if (!bio || !subjects || !hourlyRate || !experience || !availability) {
      return res.status(400).json({ message: "All fields required" });
    }

    let profile = await TutorProfile.findOne({ where: { userId } });

    if (profile) {
      await profile.update({
        bio,
        subjects,
        hourlyRate,
        experience,
        availability,
      });
    } else {
      profile = await TutorProfile.create({
        userId,
        bio,
        subjects,
        hourlyRate,
        experience,
        availability,
      });
    }

    res.status(200).json({
      message: "Tutor profile saved",
      data: profile,
    });

  } catch (error) {
    console.error("Profile save error:", error);
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

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

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
    console.error("Fetch profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ===============================
   GET ALL TUTORS (SEARCH & FILTER)
================================ */
export const getAllTutors = async (req, res) => {
  try {
    const { search, subject, rating } = req.query;

    const where = {};

    // filter by subject
    if (subject) {
      where.subjects = { [Op.contains]: [subject] }; // PostgreSQL ARRAY
    }

    // filter by rating (if column exists)
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
   GET PENDING BOOKINGS (Tutor Dashboard)
================================ */
export const getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        tutorId: req.user.id,
        status: "PENDING",
      },
      include: [
        {
          model: User,
          as: "student",
          attributes: ["fullName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(bookings);

  } catch (error) {
    console.error("Pending bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ===============================
   TUTOR DASHBOARD STATS
================================ */
export const getTutorStats = async (req, res) => {
  try {
    const tutorId = req.user.id;

    const totalStudents = await Booking.count({
      where: { tutorId },
      distinct: true,
      col: "studentId",
    });

    const today = new Date().toISOString().split("T")[0];

    const sessionsToday = await Booking.count({
      where: { tutorId, date: today },
    });

    const completedSessions = await Booking.count({
      where: { tutorId, status: "COMPLETED" },
    });

    res.status(200).json({
      totalStudents,
      sessionsToday,
      completedSessions,
    });

  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};