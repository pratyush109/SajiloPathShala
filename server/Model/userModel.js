import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

   role: {
  type: DataTypes.ENUM("tutor", "student", "admin"),
  allowNull: false,
},




    
  },
  {
    tableName: "users",
    timestamps: true, 
  }
);

export default User;
