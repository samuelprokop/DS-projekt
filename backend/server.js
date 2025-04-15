import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mysql.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import branchRouter from './routes/branchRoute.js'
import queryRouter from './routes/queryRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
}));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/branch', branchRouter);
app.use('/api/query', queryRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server running on port: ${port}`));
