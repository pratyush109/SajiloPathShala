import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import authRouter from "./Routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

connection();


app.use("/api/auth", authRouter);

app.get("/", (req, res) => res.send("API is running"));


app.listen(5000, () => console.log("Server running on port 5000"));
