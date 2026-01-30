import Review from "../Model/reviewModel.js";
import Users from "../Model/userModel.js";

export const createReview = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { tutorId, rating, comment } = req.body;

    if (!tutorId || !rating) {
      return res.status(400).json({ message: "Tutor and rating required" });
    }

    const review = await Review.create({ studentId, tutorId, rating, comment });

    // Optionally: calculate tutor avg rating and total reviews
    const allReviews = await Review.findAll({ where: { tutorId } });
    const totalReviews = allReviews.length;
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

    res.status(201).json({ message: "Review added", data: { review, avgRating, totalReviews } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorReviews = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await Review.findAll({
      where: { tutorId },
      include: [{ model: Users, as: "student", attributes: ["fullName"] }],
    });

    const formatted = reviews.map((r) => ({
      id: r.id,
      studentName: r.student.fullName,
      rating: r.rating,
      comment: r.comment,
    }));

    res.status(200).json({ data: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
