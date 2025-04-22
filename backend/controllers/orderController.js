import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import sequelize from '../config/db.js';
import cartModel from '../models/cartModel.js';
import {
    toast
} from 'react-toastify';

const enrichOrderItems = async (items) => {
    try {
        const productIds = items.map(item => item.product_id);
        const products = await Product.findAll({
            where: {
                _id: productIds
            },
            attributes: ['_id', 'name', 'price', 'image_url', 'manufacturer'],
            raw: true
        });

        return items.map(item => {
            const product = products.find(p => p._id === item.product_id);
            return {
                ...item,
                name: product?.name || `Product ${item.product_id}`,
                price: item.unit_price || item.price || product?.price || 0,
                manufacturer: item.manufacturer || product?.manufacturer || '',
                image_url: product?.image_url || null
            };
        });
    } catch (error) {
        toast.error('Failed to enrich order items');
        return items;
    }
};

const placeOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user_id, items, ...orderData } = req.body;

        if (!user_id || !items || items.length === 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const productIds = items.map(item => item.product_id);
        const products = await Product.findAll({
            where: { _id: productIds },
            attributes: ['_id', 'price']
        });

        const orderItems = items.map(item => {
            const product = products.find(p => p._id === item.product_id);
            return {
                product_id: item.product_id,
                manufacturer: item.manufacturer,
                quantity: item.quantity,
                price: product ? parseFloat(product.price) : 0
            };
        });

        const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const order = await Order.create({
            order_number: orderNumber,
            user_id: Number(user_id),
            items: orderItems,
            ...orderData
        }, { transaction: t });

        await cartModel.destroy({
            where: { user_id: Number(user_id) },
            transaction: t
        });

        await t.commit();

        res.json({
            success: true,
            orderNumber: order.order_number
        });

    } catch (error) {
        await t.rollback();
        toast.error('Failed to place order');
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const {
            orderNumber
        } = req.params;
        const order = await Order.findOne({
            where: {
                order_number: orderNumber
            }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const items = typeof order.items === 'string' ?
            JSON.parse(order.items) :
            order.items;

        const enrichedItems = await enrichOrderItems(items);

        res.json({
            success: true,
            order: {
                ...order.toJSON(),
                items: enrichedItems
            }
        });

    } catch (error) {
        toast.error('Failed to get order details');
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.findAll({
            where: {
                user_id: userId
            },
            order: [
                ['created_at', 'DESC']
            ],
            attributes: {
                exclude: ['updated_at']
            }
        });

        const ordersWithParsedItems = orders.map(order => ({
            ...order.toJSON(),
            items: typeof order.items === 'string' ?
                JSON.parse(order.items) : order.items
        }));

        return res.status(200).json({
            success: true,
            orders: ordersWithParsedItems
        });

    } catch (error) {
        toast.error('Failed to fetch user orders');
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user orders'
        });
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [
                ['created_at', 'DESC']
            ]
        });

        const enrichedOrders = await Promise.all(
            orders.map(async order => ({
                ...order.get({
                    plain: true
                }),
                items: await enrichOrderItems(
                    typeof order.items === 'string' ?
                    JSON.parse(order.items) :
                    order.items
                )
            }))
        );

        res.json({
            success: true,
            orders: enrichedOrders
        });
    } catch (error) {
        toast.error('Failed to fetch orders');
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const {
            orderNumber,
            status
        } = req.body;
        await Order.update({
            status
        }, {
            where: {
                order_number: orderNumber
            }
        });
        res.json({
            success: true,
            message: 'Status updated'
        });
    } catch (error) {
        toast.error('Failed to update order status');
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    getOrderDetails
};
