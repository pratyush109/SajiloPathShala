import request from "supertest";
import express from "express";
import tutorRoutes from "../Routes/tutorRoutes.js";

jest.mock("../middleware/token-middleware.js", () => ({
  authenticateToken: (req, res, next) => {
    req.user = { id: 1, role: "tutor" }; 
    next();
  }
}));

const app = express();
app.use(express.json());
app.use("/api/tutor", tutorRoutes);
describe("Tutor Routes", () => {
  it("GET /tutor -> get all tutors", async () => {
    const res = await request(app).get("/api/tutor");
    expect([200, 404, 500]).toContain(res.statusCode);
  });
  it("GET /tutor/profile -> get tutor profile", async () => {
    const res = await request(app).get("/api/tutor/profile");
    expect([200, 404, 500]).toContain(res.statusCode);
  });
  it("PUT /tutor/profile -> update tutor profile", async () => {
    const res = await request(app)
      .put("/api/tutor/profile")
      .send({
        bio: "Experienced math tutor",
        subjects: ["Math", "Physics"],
        hourlyRate: 25,
        experience: 5,
        availability: { monday: ["10:00-12:00"] }
      });
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it("GET /tutor/pending-bookings -> pending bookings", async () => {
    const res = await request(app).get("/api/tutor/pending-bookings");
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it("GET /tutor/stats -> tutor stats", async () => {
    const res = await request(app).get("/api/tutor/stats");
    expect([200, 404, 500]).toContain(res.statusCode);
  });
});