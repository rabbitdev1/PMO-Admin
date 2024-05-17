import bcrypt from "bcrypt"; // Pastikan bcrypt diimpor
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const InfraModel = db.define(
  "list_infrastruktur",
  {
    submission_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    submission_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telp_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type_tools: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_screenshoot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    submission_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_specifications: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proposed_bandwidth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_tools: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    full_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    submission_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    on_validation: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 1,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);


export default InfraModel;
