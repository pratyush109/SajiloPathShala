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

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.studentId !== req.user.id)
      return res.status(403).json({ message: "Not your booking" });

    booking.status = "REJECTED";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reschedule booking (student)
export const rescheduleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    if (!date || !time)
      return res.status(400).json({ message: "Date and time required" });

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.studentId !== req.user.id)
      return res.status(403).json({ message: "Not your booking" });

    booking.date = date;
    booking.time = time;
    booking.status = "PENDING"; // reset to pending for tutor approval
    await booking.save();

    res.status(200).json({ message: "Booking rescheduled", data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};