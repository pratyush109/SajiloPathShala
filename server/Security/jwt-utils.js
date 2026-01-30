import jwt from "jsonwebtoken";

const JWT_SECRET = "secret-key";

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
