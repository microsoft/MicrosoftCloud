import { Pool } from 'pg';
import './config';
import { QueryData } from './interfaces';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'CustomersDB',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

async function getCustomers() {
    try {
        console.log('Getting customers from database.');
        return await pool.query('SELECT * FROM get_customers()');
    }
    catch (e) {
        console.error('Error getting customers:', e);
        return null;
    }
}

async function queryDb(sqlCommandObject: QueryData): Promise<any[] | { error: string }> {
    if (!sqlCommandObject) {
        return { error: 'Missing SQL command object.' };
    }

    try {
        const result = await pool.query(sqlCommandObject.sql, sqlCommandObject.paramValues);

        // Check if the result has rows or an object literal, and handle accordingly
        if (!result.rows) {
            return [];
        }

        if (Array.isArray(result.rows)) {
            return result.rows;
        }

        if (typeof result.rows === 'object') {
            return [result.rows];
        }

        return [];
    }
    catch (e) {
        console.error('Error executing query:', e);
        return { error: 'Error executing query.' };
    }
}

export { getCustomers, queryDb };