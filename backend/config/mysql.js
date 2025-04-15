import mysql from 'mysql2/promise';
import 'dotenv/config';

const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'autodiely_eshop'
    });
    return connection;
};

const getDB = () => mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'autodiely_eshop'
});

export default connectDB;
export {
    getDB
};
