import {
    DataTypes
} from 'sequelize';
import sequelize from '../config/db.js';
import {
    toast
} from 'react-toastify';

const cartModel = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '_id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: '_id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: '_id'
        }
    },
    manufacturer: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'cart',
    engine: 'InnoDB',
    indexes: [{
        unique: true,
        fields: ['user_id', 'product_id', 'manufacturer']
    }]
});

(async () => {
    try {
        await cartModel.sync({
            alter: true
        });
    } catch (error) {
        toast.error(`Cart table sync failed: ${error.message}`);
    }
})();

export default cartModel;
