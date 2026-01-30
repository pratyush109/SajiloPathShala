import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Tutor = sequelize.define("Tutor", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },

  bio: DataTypes.TEXT,
  subjects: DataTypes.ARRAY(DataTypes.STRING),
  availability: DataTypes.ARRAY(DataTypes.STRING),
  experience: DataTypes.INTEGER,
  rate: DataTypes.INTEGER,

  rating: { type: DataTypes.FLOAT, defaultValue: 0 }
});

export default Tutor;
