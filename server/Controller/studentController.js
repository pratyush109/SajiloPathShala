import User from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";

export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findByPk(req.user.id, {
      attributes: ["id", "fullName", "email",  ],
    });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const {  } = req.body; 

    await User.update(
      {  }, 
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getStudentBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { studentId: req.user.id },
      include: ["tutor"],
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
