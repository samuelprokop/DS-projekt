import {
    getDB
} from '../config/mysql.js';

const queryController = {
    execute: async (req, res) => {
        let connection;
        try {
            connection = await getDB();
            const {
                query
            } = req.body;
            const [rows, fields] = await connection.query(query);

            res.json({
                fields: fields?.map(f => f.name) || [],
                rows: rows || [],
                count: rows?.length || 0
            });

        } catch (error) {
            res.status(400).json({
                error: error.sqlMessage || error.message,
                sql: error.sql
            });
        } finally {
            if (connection) await connection.end();
        }
    }
};

export {
    queryController
};
