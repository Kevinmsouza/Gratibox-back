import connection from '../database/database.js';

async function userFactory(body) {
    const {
        userId,
        planId,
        deliveryType,
        fullName,
        postalCode,
        address,
        city,
        stateId,
        products,
    } = body;
    try {
        const checkPlan = await connection.query('SELECT * FROM users WHERE id = $1;', [userId]);
        if (checkPlan.rows[0].plan_id) return 409;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < products.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await connection.query(`
                INSERT INTO users_products
                (user_id, product_id)
                VALUES ($1, $2)
            ;`, [userId, products[i]]);
        }
        await connection.query(`
            UPDATE users
            SET
                sign_date = NOW(),
                plan_id = $2,
                delivery_type = $3,
                full_name = $4,
                postal_code = $5,
                address = $6,
                city = $7,
                state_id = $8
            WHERE id = $1
        ;`, [userId, planId, deliveryType, fullName, postalCode, address, city, stateId]);
        return 201;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return 500;
    }
}

export { userFactory };
