import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import User from "./userModel.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    tutorId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"), defaultValue: "PENDING" },
  },
  { tableName: "bookings", timestamps: true }
);

Booking.belongsTo(User, { as: "student", foreignKey: "studentId" });
Booking.belongsTo(User, { as: "tutor", foreignKey: "tutorId" });

export default Booking;
