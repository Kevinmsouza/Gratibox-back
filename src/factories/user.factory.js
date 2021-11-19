import connection from '../database/database.js';

async function userFactory(body) {
    try {
        const { username, email, password } = body;
        const result = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (result.rows.length) return 409;
        await connection.query(`
            INSERT INTO users
            (username, email, password)
            VALUES ($1, $2, $3)
        ;`, [username, email, password]);
        return 201;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return 500;
    }
}

export {
    userFactory,
};
