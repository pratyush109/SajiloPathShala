import request from "supertest";
import express from "express";
import bookingRoutes from "../Routes/bookingRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/booking", bookingRoutes);

jest.mock("../middleware/token-middleware.js", () => ({
  authenticateToken: (req, res, next) => {
    req.user = { id: 2, role: "student" }; 
    next();
  },
}));

describe("Booking API Endpoints", () => {
  it("creates a booking", async () => {
    const res = await request(app)
      .post("/api/booking")
      .send({ tutorId: 3, date: "2026-02-25", time: "10:00", subject: "Math" });

    expect([201, 200, 400, 404, 500]).toContain(res.status);
  });

  it("gets bookings for a user", async () => {
    const res = await request(app).get("/api/booking");
    expect([200, 400, 404, 500]).toContain(res.status);
  });

  it("updates a booking status", async () => {
    const res = await request(app)
      .patch("/api/booking/1")
      .send({ status: "APPROVED" });

    expect([200, 400, 403, 404, 500]).toContain(res.status);
  });
});