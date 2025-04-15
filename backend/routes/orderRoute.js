import express from 'express';
import {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    getOrderDetails
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.get('/list', adminAuth, allOrders);
orderRouter.put('/status', adminAuth, updateStatus);
orderRouter.get('/details/:orderNumber', authUser, getOrderDetails);

orderRouter.post('/place', authUser, placeOrder);
orderRouter.get('/userorders', authUser, userOrders);

export default orderRouter;
