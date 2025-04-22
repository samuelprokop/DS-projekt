import {
    DataTypes
} from 'sequelize';
import sequelize from '../config/db.js';
import {
    toast
} from 'react-toastify';

const BranchModel = (branchName) => {
    return sequelize.define(`${branchName}_branch`, {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'products',
                key: '_id'
            }
        },
        product_name: DataTypes.STRING,
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        manufacturer: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    });
};

export const KeBranch = BranchModel('ke');
export const BlBranch = BranchModel('bl');
export const PpBranch = BranchModel('pp');
export const NrBranch = BranchModel('nr');
export const ScBranch = BranchModel('sc');

export const getAllInventory = async () => {
    try {
        const branches = ['ke', 'bl', 'pp', 'nr', 'sc'];
        const inventory = {};

        for (const branch of branches) {
            const query = `SELECT * FROM ${branch}_branch WHERE qty > 0`;
            const [results] = await sequelize.query(query);
            inventory[branch] = results;
        }

        return inventory;
    } catch (error) {
        toast.error(`Error fetching inventory: ${error.message}`);
        throw error;
    }
};

export const getBranchInventory = async (branch) => {
    try {
        const query = `SELECT * FROM ${branch}_branch WHERE qty > 0`;
        const [results] = await sequelize.query(query);
        return results;
    } catch (error) {
        toast.error(`Error fetching ${branch} inventory: ${error.message}`);
        throw error;
    }
};
