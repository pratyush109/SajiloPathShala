import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import User from "./userModel.js";

const TutorProfile = sequelize.define("TutorProfile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },

  hourlyRate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  availability: {
    type: DataTypes.JSON,
    allowNull: false
  }
});


User.hasOne(TutorProfile, { foreignKey: "userId" });
TutorProfile.belongsTo(User, { foreignKey: "userId" });

export default TutorProfile;
