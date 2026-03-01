import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../index.js"; // Your Express app
import Users from "../Model/userModel.js";
import Booking from "../Model/bookingModel.js";

// JWT secret (same as in your app)
const JWT_SECRET = "secret-key";

let adminToken;
let normalUser;
let adminUser;

beforeAll(async () => {
  // Create an admin user
  adminUser = await Users.create({
    fullName: "Admin User",
    email: "admin@example.com",
    password: "hashedpassword", // can be plain for tests
    role: "admin",
  });

  // Create a normal user
  normalUser = await Users.create({
    fullName: "Normal User",
    email: "user@example.com",
    password: "hashedpassword",
    role: "student",
  });

  // Create JWT for admin
  adminToken = jwt.sign(
    { id: adminUser.id, role: adminUser.role, email: adminUser.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  // Clean up DB
  await Booking.destroy({ where: {} });
  await Users.destroy({ where: {} });
});

describe("Admin Routes", () => {
  test("GET /admin/users - should return all users for admin", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  test("PATCH /admin/users/:id - update a user", async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${normalUser.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ fullName: "Updated Name" });

    expect(res.status).toBe(200);
    expect(res.body.data.fullName).toBe("Updated Name");
  });

  test("DELETE /admin/users/:id - delete a user", async () => {
    const userToDelete = await Users.create({
      fullName: "To Delete",
      email: "delete@example.com",
      password: "pass123",
      role: "student",
    });

    const res = await request(app)
      .delete(`/api/admin/users/${userToDelete.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);
  });

  test("GET /admin/bookings - should return all bookings for admin", async () => {
    // Create a booking for test
    const booking = await Booking.create({
      studentId: normalUser.id,
      tutorId: adminUser.id,
      date: new Date(),
      time: "10:00",
      subject: "Math",
      status: "PENDING",
    });

    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  test("Non-admin user should be forbidden", async () => {
    const userToken = jwt.sign(
      { id: normalUser.id, role: normalUser.role },
      JWT_SECRET
    );

    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/admins only/i);
  });
});