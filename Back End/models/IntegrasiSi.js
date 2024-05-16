import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const IntegrasiSi = db.define(
  "integrasisi",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    nama_pic: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    nomor_pic: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    nama_aplikasi: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    deskripsi_aplikasi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    tujuan_integrasi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    dokumen_splp: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    dokumen_splp_nasional: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export { IntegrasiSi };
