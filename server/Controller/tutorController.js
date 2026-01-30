import TutorProfile from "../Model/tutorProfileModel.js";
import User from "../Model/userModel.js";


export const upsertTutorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { bio, subjects, hourlyRate, experience, availability } = req.body;

    if (!bio || !subjects || !hourlyRate || !experience || !availability) {
      return res.status(400).json({ message: "All fields required" });
    }

    let profile = await TutorProfile.findOne({ where: { userId } });

    if (profile) {
      await profile.update({ bio, subjects, hourlyRate, experience, availability });
    } else {
      profile = await TutorProfile.create({ userId, bio, subjects, hourlyRate, experience, availability });
    }

    res.status(200).json({ message: "Tutor profile saved", data: profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTutorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await TutorProfile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTutors = async (req, res) => {
  try {
    const tutors = await TutorProfile.findAll({
      include: {
        model: User,
        attributes: ["id", "fullName", "email"],
        where: { role: "tutor" },
      },
    });

    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
