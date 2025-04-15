import sequelize from "../config/db.js";
import BranchOrder from '../models/branchOrderModel.js';
import {
    toast
} from 'react-toastify';

const addToBranch = async (req, res) => {
    try {
        const {
            branch,
            product_id,
            product_name,
            qty,
            manufacturer
        } = req.body;

        const validBranches = ['ke', 'bl', 'pp', 'nr', 'sc'];
        if (!validBranches.includes(branch)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid branch specified'
            });
        }

        if (!product_id || !product_name || qty === undefined || !manufacturer) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const manufacturerValue = typeof manufacturer === 'string' ?
            manufacturer :
            JSON.stringify(manufacturer);

        const query = `
            INSERT INTO ${branch}_branch 
            (product_id, product_name, qty, manufacturer)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                qty = qty + ?,
                product_name = ?,
                manufacturer = ?
        `;

        res.json({
            success: true,
            message: 'Product added to branch successfully'
        });

    } catch (error) {
        toast.error('Failed to add product to branch');
        res.status(500).json({
            success: false,
            message: 'Failed to add product to branch',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getAllBranchInventory = async (req, res) => {
    try {
        const inventory = await getAllInventory();
        res.json({
            success: true,
            data: inventory
        });
    } catch (error) {
        toast.error('Failed to fetch inventory');
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inventory',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getSingleBranchInventory = async (req, res) => {
    try {
        const {
            branch
        } = req.params;
        const validBranches = ['ke', 'bl', 'pp', 'nr', 'sc'];

        if (!validBranches.includes(branch)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid branch specified'
            });
        }

        const [results] = await sequelize.query(`SELECT * FROM ${branch}_branch`);

        res.json({
            success: true,
            data: {
                branch,
                inventory: results
            }
        });
    } catch (error) {
        toast.error('Failed to fetch branch inventory');
        res.status(500).json({
            success: false,
            message: 'Failed to fetch branch inventory',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getProductPrice = async (req, res) => {
    try {
        const {
            product_id
        } = req.params;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        const [results] = await sequelize.query(
            `SELECT price FROM products WHERE _id = ?`, {
                replacements: [product_id]
            }
        );

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: {
                price: results[0].price
            }
        });

    } catch (error) {
        toast.error('Failed to fetch product price');
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product price',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const generateOrderNumber = (branch) => {
    const prefix = branch.toUpperCase();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${random}`;
};

const createOrder = async (req, res) => {
    const cityToBranchCode = {
        'Bratislava': 'bl',
        'Košice': 'ke',
        'Nitra': 'nr',
        'Poprad': 'pp',
        'Senec': 'sc'
    };

    const transaction = await sequelize.transaction();

    try {
        const {
            branch: cityName = '',
            product_id = '',
            product_name = '',
            manufacturer = '',
            quantity = 0,
            price = 0,
            customer_name = '',
            customer_email = '',
            customer_phone = '',
            notes = ''
        } = req.body;

        const branchCode = cityToBranchCode[cityName];

        const requiredFields = {
            branch: {
                value: branchCode,
                valid: Object.values(cityToBranchCode),
                error: `Invalid city. Valid cities: ${Object.keys(cityToBranchCode).join(', ')}`
            },
            product_id: {
                value: product_id,
                type: 'number',
                error: 'Product ID must be a number'
            },
            product_name: {
                value: product_name,
                error: 'Product name is required'
            },
            manufacturer: {
                value: manufacturer,
                error: 'Manufacturer is required'
            },
            quantity: {
                value: quantity,
                min: 1,
                error: 'Quantity must be at least 1'
            },
            price: {
                value: price,
                min: 0.01,
                error: 'Price must be positive'
            },
            customer_name: {
                value: customer_name,
                error: 'Customer name is required'
            }
        };

        const errors = [];
        Object.entries(requiredFields).forEach(([field, config]) => {
            if (config.value === undefined || config.value === null || config.value === '') {
                errors.push(`${field}: ${config.error}`);
            } else if (config.valid && !config.valid.includes(config.value)) {
                errors.push(`${field}: ${config.error}`);
            } else if (config.type === 'number' && isNaN(Number(config.value))) {
                errors.push(`${field}: ${config.error}`);
            } else if (config.min && Number(config.value) < config.min) {
                errors.push(`${field}: ${config.error}`);
            }
        });

        if (errors.length > 0) {
            await transaction.rollback();
            toast.error('Validation failed');
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        const order_number = generateOrderNumber(branchCode);

        const order = await BranchOrder.create({
            branch: branchCode,
            order_number,
            product_id: Number(product_id),
            product_name,
            manufacturer,
            quantity: Number(quantity),
            price: Number(price),
            customer_name,
            customer_email,
            customer_phone,
            notes
        }, {
            transaction
        });

        const [updateResult] = await sequelize.query(
            `UPDATE ${branchCode}_branch 
             SET qty = GREATEST(0, qty - ?) 
             WHERE product_id = ?`, {
                replacements: [quantity, product_id],
                transaction
            }
        );

        if (updateResult.affectedRows === 0) {
            await transaction.rollback();
            toast.error('Product not found in branch inventory');
            return res.status(404).json({
                success: false,
                message: 'Product not found in branch inventory'
            });
        }

        const [inventory] = await sequelize.query(
            `SELECT qty FROM ${branchCode}_branch WHERE product_id = ?`, {
                replacements: [product_id],
                transaction
            }
        );

        await transaction.commit();

        return res.json({
            success: true,
            message: 'Order created successfully',
            data: {
                order_number,
                order_id: order._id,
                remaining_quantity: inventory[0].qty
            }
        });

    } catch (error) {
        await transaction.rollback();
        toast.error('Failed to create order');
        return res.status(500).json({
            success: false,
            message: 'Failed to create order',
            ...(process.env.NODE_ENV === 'development' && {
                error: error.message
            })
        });
    }
};

const getBranchInvoices = async (req, res) => {
    try {
        const [invoices] = await sequelize.query(`
            SELECT 
                _id, 
                order_number,
                branch,
                product_id,
                product_name,
                manufacturer,
                quantity,
                price,
                customer_name,
                customer_email,
                customer_phone,
                notes,
                created_at
            FROM branch_orders
            ORDER BY created_at DESC
        `);

        const formattedInvoices = invoices.map(invoice => ({
            ...invoice,
            items: [{
                product_id: invoice.product_id,
                name: invoice.product_name,
                manufacturer: invoice.manufacturer,
                quantity: invoice.quantity,
                price: invoice.price
            }]
        }));

        res.json({
            success: true,
            data: formattedInvoices
        });
    } catch (error) {
        toast.error('Failed to fetch invoices');
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invoices'
        });
    }
};

export {
    addToBranch,
    getAllBranchInventory,
    getSingleBranchInventory,
    getProductPrice,
    generateOrderNumber,
    createOrder,
    getBranchInvoices
};
