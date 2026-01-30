
import express from "express";

const router = express.Router();

const subjects = [
  { _id: 1, name: "Math" },
  { _id: 2, name: "Physics" },
  { _id: 3, name: "Chemistry" },
  { _id: 4, name: "Biology" },
  { _id: 5, name: "English" },
];

router.get("/", (req, res) => {
  res.json(subjects);
});

export default router;
