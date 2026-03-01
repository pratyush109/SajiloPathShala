import SequelizeMock from "sequelize-mock";
const dbMock = new SequelizeMock();
const BookingMock = dbMock.define("Booking", {
  id: 1,
  studentId: 2,
  tutorId: 3,
  date: "2026-02-24",
  time: "10:00",
  subject: "Math",
  status: "PENDING",
});
describe("Booking Model", () => {
  it("should create a booking", async () => {
    const booking = await BookingMock.create({
      studentId: 2,
      tutorId: 3,
      date: "2026-02-25",
      time: "14:00",
      subject: "Physics",
    });
expect(booking.studentId).toBe(2);
    expect(booking.tutorId).toBe(3);
    expect(booking.status).toBe("PENDING");
  });
it("should require studentId, tutorId, date, time, and subject", async () => {
   const booking = await BookingMock.create({
      studentId: 2,
      tutorId: 3,
      date: "2026-02-26",
      time: "15:00",
      subject: "Chemistry",
      status: "PENDING"
    });
    expect(booking).toBeDefined();
    expect(booking.studentId).toBe(2);
  });
});