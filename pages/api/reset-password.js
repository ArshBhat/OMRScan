const pool = require('./header'); // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, newPassword } = req.body;

    try {
      const client = await pool.connect();

      // Check if the token is valid and not expired
      const query = 'SELECT * FROM PasswordResets WHERE reset_token = $1 AND reset_token_expiry > NOW()';
      const result = await client.query(query, [token]);

      if (result.rows.length > 0) {
        const userId = result.rows[0].user_id;
        // Update the user's password
        const updateQuery = 'UPDATE Users SET password = $1 WHERE id = $2';
        await client.query(updateQuery, [newPassword, userId]);

        // Delete the used reset token
        const deleteQuery = 'DELETE FROM PasswordResets WHERE reset_token = $1';
        await client.query(deleteQuery, [token]);

        client.release();
        res.status(200).json({ message: 'Password reset successful' });
      } else {
        client.release();
        res.status(400).json({ message: 'Invalid or expired token' });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
