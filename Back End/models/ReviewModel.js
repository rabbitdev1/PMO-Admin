import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const ListReviewsModel = db.define(
    "list_reviews", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_submission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submission_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submission_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name_pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    }, {
        freezeTableName: true,
    }
);


export default ListReviewsModel;