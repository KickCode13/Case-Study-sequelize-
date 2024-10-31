import { DataTypes } from "sequelize";
import db from "../db/conn.js";
import User from "../models/User.js";

const Adress = db.define("Adress", {
  street: {
    required: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  number: {
    required: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  city: {
    required: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
});

Adress.belongsTo(User);

export default Adress;
