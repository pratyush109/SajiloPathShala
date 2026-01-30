import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import Users from "./userModel.js";

const Review = sequelize.define("Review", {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  tutorId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.FLOAT, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true },
});

Review.belongsTo(Users, { as: "student", foreignKey: "studentId" });
Review.belongsTo(Users, { as: "tutor", foreignKey: "tutorId" });

export default Review;
