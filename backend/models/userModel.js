import {
    DataTypes
} from 'sequelize';
import sequelize from '../config/db.js';
import {
    toast
} from 'react-toastify';

const userModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: '_id'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'users',
    engine: 'InnoDB'
});

(async () => {
    try {
        await userModel.sync();
    } catch (error) {
        toast.error(`User model sync failed: ${error.message}`);
    }
})();

export default userModel;
