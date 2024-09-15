const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    user: 'owlmark_user',
    host: '127.0.0.1',
    database: 'owlmark',
    password: 'your_password',
    port: 5432, // default PostgreSQL port
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        client.query('SELECT NOW()', (err, result) => {
            release();
            if (err) {
                console.error('Error executing query', err.stack);
            } else {
                console.log('Connected to the database at:', result.rows[0].now);
            }
        });
    }
});

// Export the pool for use in other modules
module.exports = pool;
