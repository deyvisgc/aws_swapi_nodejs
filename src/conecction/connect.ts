import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    debug: false
});

export default pool;
