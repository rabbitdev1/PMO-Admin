import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
    "users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apiKey: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        activeSession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instansi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status_account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);

Users.prototype.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

export default Users;