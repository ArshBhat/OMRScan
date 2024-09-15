const pool = require('./header'); // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const client = await pool.connect();

      // Check if the email already exists
      const checkQuery = 'SELECT * FROM Users WHERE email = $1';
      const checkResult = await client.query(checkQuery, [email]);

      if (checkResult.rows.length > 0) {
        client.release();
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Insert the new user
      const insertQuery = 'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING *';
      const insertResult = await client.query(insertQuery, [email, password]);
      client.release();

      res.status(200).json({ message: 'User registered successfully', user: insertResult.rows[0] });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
