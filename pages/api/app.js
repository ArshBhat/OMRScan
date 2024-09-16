import express from 'express';
import registerHandler from './register';
import loginHandler from './login';
import forgotPasswordHandler from './forgot-password';
import resetPasswordHandler from './reset-password'; // Import the reset-password handler

const app = express();

app.use(express.json());

app.post('/api/register', registerHandler);
app.post('/api/login', loginHandler);
app.post('/api/forgot-password', forgotPasswordHandler);
app.post('/api/reset-password', resetPasswordHandler); // Add the reset-password route

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
