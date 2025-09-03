const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'exam',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully!");
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process if database connection fails
    }
}

module.exports = {
    pool,
    testDbConnection
};