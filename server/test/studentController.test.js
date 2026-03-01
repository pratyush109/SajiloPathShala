import { jest } from "@jest/globals";

// Mock modules with proper methods  
jest.mock("../Model/userModel.js", () => ({
  findByPk: jest.fn().mockResolvedValue({
    id: 1,
    fullName: "Test Student",
    email: "student@test.com"
  }),
  update: jest.fn().mockResolvedValue([1]),
  findAll: jest.fn().mockResolvedValue([]),
  __esModule: true,
  default: {
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      fullName: "Test Student",
      email: "student@test.com"
    }),
    update: jest.fn().mockResolvedValue([1]),
    findAll: jest.fn().mockResolvedValue([])
  }
}));

jest.mock("../Model/bookingModel.js", () => ({
  findByPk: jest.fn().mockResolvedValue({
    id: 1,
    studentId: 1,
    tutorId: 2,
    date: "2026-02-25",
    time: "10:00",
    subject: "Math",
    status: "PENDING",
    save: jest.fn().mockResolvedValue(this)
  }),
  findAll: jest.fn().mockResolvedValue([]),
  destroy: jest.fn().mockResolvedValue(1),
  __esModule: true,
  default: {
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      studentId: 1,
      tutorId: 2,
      date: "2026-02-25",
      time: "10:00",
      subject: "Math",
      status: "PENDING",
      save: jest.fn().mockResolvedValue(this)
    }),
    findAll: jest.fn().mockResolvedValue([]),
    destroy: jest.fn().mockResolvedValue(1)
  }
}));

// Import controller after mocks are set up
import * as studentController from "../Controller/studentController.js";

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Student Controller", () => {
  let req, res;

  beforeEach(() => {
    res = mockResponse();
    req = { user: { id: 1, role: "student" }, body: {}, params: {} };
  });

  it("should return student profile", async () => {
    await studentController.getStudentProfile(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it("should cancel a booking", async () => {
    req.params.id = 1;
    await studentController.cancelBooking(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith(expect.objectContaining({ message: "Booking cancelled" }));
  });

  it("should reschedule a booking", async () => {
    req.params.id = 1;
    req.body = { date: "2026-03-01", time: "12:00" };
    await studentController.rescheduleBooking(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Booking rescheduled" }));
  });
});