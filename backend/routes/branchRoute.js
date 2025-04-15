import express from 'express';
import {
    addToBranch,
    getAllBranchInventory,
    getSingleBranchInventory,
    getProductPrice,
    createOrder,
    getBranchInvoices
} from '../controllers/branchController.js';
import adminAuth from '../middleware/adminAuth.js';

const branchRouter = express.Router();

branchRouter.post('/add', adminAuth, addToBranch);
branchRouter.get('/inventory', getAllBranchInventory);
branchRouter.get('/inventory/:branch', getSingleBranchInventory);
branchRouter.get('/product/price/:product_id', getProductPrice);
branchRouter.post('/sell', createOrder);
branchRouter.get('/invoices', getBranchInvoices);

export default branchRouter;
