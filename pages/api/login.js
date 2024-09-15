const pool = require('./header'); // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const client = await pool.connect();

      // Check if the email and password match
      const query = 'SELECT * FROM Users WHERE email = $1 AND password = $2';
      const result = await client.query(query, [email, password]);

      if (result.rows.length > 0) {
        client.release();
        res.status(200).json({ message: 'Login successful' });
      } else {
        client.release();
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
