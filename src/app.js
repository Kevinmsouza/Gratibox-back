import express from 'express';
import cors from 'cors';
import { postLogin, postSignUp } from './controllers/users.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('Belezinha');
});

// USERS
app.post('/sign-up', postSignUp);
app.post('/login', postLogin);

export default app;
