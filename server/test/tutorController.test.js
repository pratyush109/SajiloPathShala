import { jest } from "@jest/globals";

// Mock the models before importing controller
jest.mock("../Model/tutorProfileModel.js", () => ({
  findByPk: jest.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    bio: "Math Tutor",
    subjects: ["Math"],
    hourlyRate: 25,
    experience: 5,
    availability: { monday: ["10:00-12:00"] },
    rating: 4.5,
    update: jest.fn().mockResolvedValue({ id: 1 }),
    save: jest.fn().mockResolvedValue({ id: 1 }),
  }),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      bio: "Math Tutor",
      subjects: ["Math"],
      hourlyRate: 25,
      rating: 4.5,
      User: { fullName: "John Doe", email: "john@example.com" },
    },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    bio: "Math Tutor",
    update: jest.fn().mockResolvedValue({ id: 1 }),
  }),
  create: jest.fn().mockResolvedValue({ id: 1, userId: 1, bio: "Bio" }),
  count: jest.fn().mockResolvedValue(3),
  __esModule: true,
  default: {
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      userId: 1,
      bio: "Math Tutor",
      subjects: ["Math"],
      hourlyRate: 25,
      experience: 5,
      availability: { monday: ["10:00-12:00"] },
      rating: 4.5,
      update: jest.fn().mockResolvedValue({ id: 1 }),
      save: jest.fn().mockResolvedValue({ id: 1 }),
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        userId: 1,
        bio: "Math Tutor",
        subjects: ["Math"],
        hourlyRate: 25,
        rating: 4.5,
        User: { fullName: "John Doe", email: "john@example.com" },
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      userId: 1,
      bio: "Math Tutor",
      update: jest.fn().mockResolvedValue({ id: 1 }),
    }),
    create: jest.fn().mockResolvedValue({ id: 1, userId: 1, bio: "Bio" }),
    count: jest.fn().mockResolvedValue(3),
  }
}));

jest.mock("../Model/userModel.js", () => ({
  findByPk: jest.fn().mockResolvedValue({
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    role: "tutor",
  }),
  __esModule: true,
  default: {
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      role: "tutor",
    }),
  }
}));

jest.mock("../Model/bookingModel.js", () => ({
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      tutorId: 1,
      studentId: 2,
      date: "2026-02-24",
      status: "PENDING",
    },
    {
      id: 2,
      tutorId: 1,
      studentId: 3,
      date: "2026-02-25",
      status: "APPROVED",
    },
  ]),
  count: jest.fn().mockResolvedValue(2),
  __esModule: true,
  default: {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        tutorId: 1,
        studentId: 2,
        date: "2026-02-24",
        status: "PENDING",
      },
      {
        id: 2,
        tutorId: 1,
        studentId: 3,
        date: "2026-02-25",
        status: "APPROVED",
      },
    ]),
    count: jest.fn().mockResolvedValue(2),
  }
}));

import {
  upsertTutorProfile,
  getTutorProfile,
  getAllTutors,
  getPendingBookings,
  getTutorStats,
} from "../Controller/tutorController.js";

const mockReqRes = (user = { id: 1, role: "tutor" }, body = {}, params = {}, query = {}) => ({
  req: { user, body, params, query },
  res: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
});

describe("Tutor Controller", () => {
  it("should create or update tutor profile", async () => {
    const { req, res } = mockReqRes(
      { id: 1, role: "tutor" },
      { bio: "Bio", subjects: ["Math"], hourlyRate: 20, experience: 2, availability: { monday: ["10:00-12:00"] } }
    );

    await upsertTutorProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Tutor profile saved" })
    );
  });

  it("should fetch tutor profile", async () => {
    const { req, res } = mockReqRes();

    await getTutorProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should fetch all tutors", async () => {
    const { req, res } = mockReqRes({}, {}, {}, { search: "John", subject: "Math", rating: 4 });

    await getAllTutors(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should fetch pending bookings for tutor", async () => {
    const { req, res } = mockReqRes();

    await getPendingBookings(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should fetch tutor stats", async () => {
    const { req, res } = mockReqRes();

    await getTutorStats(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        totalStudents: expect.any(Number),
        sessionsToday: expect.any(Number),
        completedSessions: expect.any(Number),
      })
    );
  });
});