import cartModel from "../models/cartModel.js";
import {
    Op
} from 'sequelize';
import {
    toast
} from 'react-toastify';

const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            itemId,
            manufacturer
        } = req.body;

        if (!itemId || !manufacturer) {
            return res.status(400).json({
                success: false,
                message: "Product ID and manufacturer are required"
            });
        }

        const numericUserId = Number(userId);
        const numericItemId = Number(itemId);

        const [cartItem, created] = await cartModel.findOrCreate({
            where: {
                user_id: numericUserId,
                product_id: numericItemId,
                manufacturer
            },
            defaults: {
                user_id: numericUserId,
                product_id: numericItemId,
                manufacturer,
                quantity: 1
            }
        });

        if (!created) {
            await cartItem.increment('quantity', {
                by: 1
            });
        }

        res.json({
            success: true,
            message: "Added to cart",
            userId: numericUserId
        });

    } catch (error) {
        toast.error("Failed to add item to cart");
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const userId = Number(req.userId);
        const {
            itemId,
            manufacturer,
            quantity
        } = req.body;
        const numericItemId = Number(itemId);

        if (quantity <= 0) {
            await cartModel.destroy({
                where: {
                    user_id: userId,
                    product_id: numericItemId,
                    manufacturer
                }
            });
            return res.json({
                success: true,
                message: "Item removed from cart"
            });
        }

        const [updated] = await cartModel.update({
            quantity
        }, {
            where: {
                user_id: userId,
                product_id: numericItemId,
                manufacturer
            }
        });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.json({
            success: true,
            message: "Cart updated"
        });

    } catch (error) {
        toast.error("Failed to update cart");
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

const getUserCart = async (req, res) => {
    try {
        const userId = Number(req.userId);
        const cartItems = await cartModel.findAll({
            where: {
                user_id: userId,
                quantity: {
                    [Op.gt]: 0
                }
            }
        });

        const formattedCart = {};
        cartItems.forEach(item => {
            const productId = item.product_id.toString();
            if (!formattedCart[productId]) {
                formattedCart[productId] = {};
            }
            formattedCart[productId][item.manufacturer] = item.quantity;
        });

        res.json({
            success: true,
            userId: userId,
            cartData: formattedCart
        });

    } catch (error) {
        toast.error("Failed to fetch cart");
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export {
    addToCart,
    updateCart,
    getUserCart
};
