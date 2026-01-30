import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";

import authRouter from "./Routes/authRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import reviewRouter from "./Routes/reviewRoutes.js";
import tutorRoutes from "./Routes/tutorRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import subjectRoutes from "./Routes/subjectRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js"; 

const app = express();
app.use(express.json());
app.use(cors());


connection();


app.use("/api/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/review", reviewRouter);
app.use("/api/tutor", tutorRoutes);
app.use("/api/subjects", subjectRoutes);

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes); 


app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
