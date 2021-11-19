import connection from '../database/database.js';

async function userFactory(body) {
    try {
        const { name, email, password } = body;
        await connection.query(`
            INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3)
        ;`, [name, email, password]);
        return true;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return false;
    }
}

export default {
    userFactory,
};
