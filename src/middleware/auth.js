import connection from '../database/database.js';

// eslint-disable-next-line consistent-return
export default async function authentication(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
    if (!result.rows.length) return res.sendStatus(403);
    res.locals.userId = result.rows[0].user_id;
    next();
}
