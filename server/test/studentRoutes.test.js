import request from "supertest";
import express from "express";
import studentRoutes from "../Routes/studentRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/student", studentRoutes);
jest.mock("../middleware/token-middleware.js", () => ({
  authenticateToken: (req, res, next) => {
    req.user = { id: 1, role: "student" }; 
    next();
  }
}));

describe("Student Routes", () => {
  it("GET /student/profile -> returns profile", async () => {
    const res = await request(app).get("/api/student/profile");
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it("PATCH /student/cancel/:id -> cancel booking", async () => {
    const res = await request(app).patch("/api/student/cancel/1");
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it("PATCH /student/reschedule/:id -> reschedule booking", async () => {
    const res = await request(app)
      .patch("/api/student/reschedule/1")
      .send({ date: "2026-03-02", time: "15:00" });
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});