import {
    v2 as cloudinary
} from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            branches,
            manufacturers,
            bestseller = "false",
            cta = ""
        } = req.body;

        let imageUrl = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const productData = {
            name,
            description,
            cta,
            category,
            price: parseFloat(price),
            subCategory: branches ? JSON.parse(branches) : [],
            manufacturer: manufacturers ? JSON.parse(manufacturers) : [],
            bestseller: bestseller === "true",
            image_url: imageUrl,
        };

        const product = await productModel.create(productData);
        res.json({
            success: true,
            message: "Product Added",
            product
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

const removeProduct = async (req, res) => {
    try {
        await productModel.destroy({
            where: {
                _id: req.body.id
            }
        });
        res.json({
            success: true,
            message: "Product Removed"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

const singleProduct = async (req, res) => {
    try {
        const {
            productId
        } = req.body;
        const product = await productModel.findByPk(productId);
        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct
};
