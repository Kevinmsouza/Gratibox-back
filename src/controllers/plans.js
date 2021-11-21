import connection from '../database/database.js';
import { planFactory } from '../factories/plan.factory.js';
import { validatePlan } from '../validation/plans.js';

async function postPlan(req, res) {
    const { userId } = res.locals;
    if (validatePlan(req.body)) return res.sendStatus(400);
    const httpCode = await planFactory({ ...req.body, userId });
    return res.sendStatus(httpCode);
}

async function getPlanInfo(req, res) {
    const { userId } = res.locals;
    try {
        const result = await connection.query(`
            SELECT * 
            FROM users 
                JOIN plans 
                    ON users.plan_id = plans.id
            WHERE users.id = $1
        ;`, [userId]);
        return res.send(result.rows);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return res.sendStatus(500);
    }
}

export {
    postPlan,
    getPlanInfo,
};
