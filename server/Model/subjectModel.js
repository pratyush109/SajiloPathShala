import { DataTypes } from "sequelize";
import sequelize from "../Database/db.js";

const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // ensures no duplicates
  },
});

export default Subject;