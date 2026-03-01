import { jest } from "@jest/globals";
import * as BookingController from "../Controller/bookingController.js";
import Booking from "../Model/bookingModel.js";
import Users from "../Model/userModel.js";

jest.mock("../Model/bookingModel.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock("../Model/userModel.js", () => ({
  findByPk: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Booking Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("creates a booking successfully", async () => {
    const req = { body: { tutorId: 3, date: "2026-02-25", time: "10:00", subject: "Math" }, user: { id: 2 } };
    const res = mockResponse();

    Users.findByPk.mockResolvedValue({ id: 3, role: "tutor" });
    Booking.create.mockResolvedValue({ id: 1, ...req.body, studentId: 2, status: "PENDING" });

    await BookingController.createBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Booking created" }));
  });

  it("fails to create booking if tutor not found", async () => {
    const req = { body: { tutorId: 999, date: "2026-02-25", time: "10:00", subject: "Math" }, user: { id: 2 } };
    const res = mockResponse();

    Users.findByPk.mockResolvedValue(null);

    await BookingController.createBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tutor not found" });
  });

  it("updates booking status correctly", async () => {
    const req = { params: { id: 1 }, body: { status: "APPROVED" }, user: { id: 3, role: "tutor" } };
    const res = mockResponse();

    Booking.findByPk.mockResolvedValue({ id: 1, tutorId: 3, status: "PENDING", save: jest.fn() });

    await BookingController.updateBookingStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Booking updated" }));
  });
});