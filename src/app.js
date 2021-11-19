import express from 'express';
import cors from 'cors';
import { postSignUp } from './controllers/users.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('Belezinha');
});

// USERS
app.post('/sign-up', postSignUp);

export default app;
