import bcrypt from 'bcrypt';
import { userFactory } from '../factories/user.factory.js';
import { validateUser } from '../validation/users.js';

async function postSignUp(req, res) {
    if (validateUser(req.body)) return res.sendStatus(400);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const httpCode = await userFactory({ ...req.body, password: hashedPassword });
    return res.sendStatus(httpCode);
}

export {
    postSignUp,
};
