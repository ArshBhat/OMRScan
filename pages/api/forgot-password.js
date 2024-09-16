const pool = require('./header'); // Adjust the path as necessary
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter;
const createTransporter = () => {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return reject(err);
      }

      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      resolve();
    });
  });
};

// Ensure the transporter is created before handling requests
let transporterReady = createTransporter();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      await transporterReady; // Wait for the transporter to be ready

      const client = await pool.connect();

      // Check if the email exists in the database
      const query = 'SELECT id FROM Users WHERE email = $1';
      const result = await client.query(query, [email]);

      if (result.rows.length > 0) {
        const userId = result.rows[0].id;
        // Generate a password reset token (for simplicity, using a random string here)
        const resetToken = Math.random().toString(36).substr(2);
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

        // Save the reset token to the PasswordResets table
        const insertQuery = 'INSERT INTO PasswordResets (user_id, reset_token, reset_token_expiry) VALUES ($1, $2, $3)';
        await client.query(insertQuery, [userId, resetToken, resetTokenExpiry]);

        // Send the password reset email asynchronously
        const msg = {
          to: email,
          from: 'no-reply@example.com', // Use a generic sender email
          subject: 'Password Reset',
          text: `You requested a password reset. Your reset token is: ${resetToken}`,
        };

        transporter.sendMail(msg, (error, info) => {
          if (error) {
            console.error('Error sending password recovery email:', error);
          } else {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        });

        client.release();
        res.status(200).json({ message: 'Password recovery email sent' });
      } else {
        client.release();
        res.status(404).json({ message: 'Email not found' });
      }
    } catch (error) {
      console.error('Error sending password recovery email:', error);
      res.status(500).json({ message: 'Error sending password recovery email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
