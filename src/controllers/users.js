import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { userFactory } from '../factories/user.factory.js';
import { validateUser } from '../validation/users.js';

async function postSignUp(req, res) {
    if (validateUser(req.body)) return res.sendStatus(400);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const httpCode = await userFactory({ ...req.body, password: hashedPassword });
    return res.sendStatus(httpCode);
}

async function postLogin(req, res) {
    const { email, password } = req.body;
    try {
        const userCheck = await connection.query('SELECT * FROM users WHERE email iLIKE $1;', [email]);
        const user = userCheck.rows[0];
        if (!user || !bcrypt.compareSync(password, user.password)) return res.sendStatus(400);
        await connection.query('DELETE FROM sessions WHERE user_id = $1;', [user.id]);
        const token = uuid();
        await connection.query(`
            INSERT INTO sessions
            (user_id, token)
            VALUES ($1, $2)
        ;`, [user.id, token]);
        return res.send({
            token,
            username: user.username,
            planId: user.plan_id,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.sendStatus(500);
    }
}

export {
    postSignUp,
    postLogin,
};
