import express from 'express';
import registerHandler from './register';

const app = express();

app.use(express.json());

app.post('/api/register', registerHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
