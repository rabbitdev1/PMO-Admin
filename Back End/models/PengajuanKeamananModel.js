import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ListSecurityTesting = db.define(
  "list_security_testing",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
    },
    pic_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    pic_number: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    apiKey: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    app_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    app_description: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    app_version: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    app_ownership: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    domain_url: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    business_process_document: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    freezeTableName: true,
    timestamps: false, 
  }
);

export { ListSecurityTesting };
