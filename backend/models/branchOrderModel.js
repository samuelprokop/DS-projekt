import {
    DataTypes
} from 'sequelize';
import sequelize from '../config/db.js';

const BranchOrder = sequelize.define('branch_orders', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    branch: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            isIn: [
                ['ke', 'bl', 'pp', 'nr', 'sc']
            ]
        }
    },
    order_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: '_id'
        }
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    customer_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING(255)
    },
    customer_phone: {
        type: DataTypes.STRING(20)
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'branch_orders'
});

export default BranchOrder;
