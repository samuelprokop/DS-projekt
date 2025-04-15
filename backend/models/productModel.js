import {
    DataTypes
} from "sequelize";
import sequelize from "../config/db.js";

const productModel = sequelize.define(
    "product", {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cta: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        bestseller: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        manufacturer: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        subCategory: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
    }, {
        timestamps: false,
        tableName: "products",
        engine: "InnoDB",
    }
);

export default productModel;
