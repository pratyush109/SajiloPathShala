import Booking from "../Model/bookingModel.js";
import Users from "../Model/userModel.js";

export const createBooking = async (req, res) => {
  try {
    const { tutorId, date, time, subject } = req.body.data;
    const studentId = req.user.id;

    if (!tutorId || !date || !time || !subject)
      return res.status(400).json({ message: "All fields required" });

    const tutor = await Users.findByPk(tutorId);
    if (!tutor || tutor.role !== "tutor")
      return res.status(404).json({ message: "Tutor not found" });

    const booking = await Booking.create({
      studentId,
      tutorId,
      date,
      time,
      subject, 
      status: "PENDING",
    });

    res.status(201).json({ message: "Booking created", data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


export const getBookingsForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    
    const where =
      role === "tutor"
        ? { tutorId: userId }
        : role === "student"
        ? { studentId: userId }
        : {}; // admin sees all

    const bookings = await Booking.findAll({
      where,
      include: [
        { model: Users, as: "student", attributes: ["fullName"] },
        { model: Users, as: "tutor", attributes: ["fullName"] }
      ],
    });

    const formatted = bookings.map((b) => ({
      id: b.id,
      studentName: b.student.fullName,
      tutorName: b.tutor.fullName,
      subject: b.subject || "N/A",
      date: b.date,
      time: b.time,
      status: b.status,
    }));

    res.status(200).json({ data: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });


    if (req.user.role !== "tutor") {
      return res.status(403).json({ message: "Only tutors can update booking" });
    }

    if (booking.tutorId !== req.user.id) {
      return res.status(403).json({ message: "Not your booking" });
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: "Booking updated",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
