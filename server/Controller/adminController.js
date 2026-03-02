import Users from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";
import TutorProfile from "../Model/tutorProfileModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await Users.count();
    const totalTutors = await Users.count({ where: { role: "tutor" } });
    const totalBookings = await Booking.count();
   
    const totalRevenue = await Booking.count({ where: { status: "COMPLETED" } });

    res.status(200).json({ totalUsers, totalTutors, totalBookings, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
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
};

/*  */