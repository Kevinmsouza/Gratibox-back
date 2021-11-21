import dayjs from 'dayjs';
import connection from '../database/database.js';
import { planFactory } from '../factories/plan.factory.js';
import { validatePlan } from '../validation/plans.js';

async function postPlan(req, res) {
    const { userId } = res.locals;
    if (validatePlan(req.body)) return res.sendStatus(400);
    const httpCode = await planFactory({ ...req.body, userId });
    return res.sendStatus(httpCode);
}

function calculateDeliveryDates(planId, deliveryType) {
    const deliveryDates = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
        if (planId === 1) {
            const weekDay = deliveryType * 2 - 1;
            deliveryDates.push(dayjs().day(weekDay + i * 7).format('DD/MM/YYYY'));
        }
        if (planId === 2) {
            let monthDay;
            switch (deliveryType) {
            case 1:
                monthDay = 1;
                break;
            case 2:
                monthDay = 10;
                break;
            case 3:
                monthDay = 20;
                break;
            default:
                break;
            }
            let originalDate = dayjs().date(monthDay).add(i, 'month');
            if (originalDate.get('day') === 0) originalDate = originalDate.day(1);
            if (originalDate.get('day') === 6) originalDate = originalDate.day(8);
            deliveryDates.push(originalDate.format('DD/MM/YYYY'));
        }
    }
    return deliveryDates;
}

async function getPlanInfo(req, res) {
    const { userId } = res.locals;
    try {
        const planInfo = await connection.query(`
            SELECT 
                users.plan_id AS "planId",
                plans.type AS "planType",
                users.delivery_type AS "deliveryType",
                users.sign_date AS "signDate"
            FROM users 
                JOIN plans 
                    ON users.plan_id = plans.id
            WHERE users.id = $1
        ;`, [userId]);
        let result = planInfo.rows[0];
        const products = await connection.query(`
            SELECT products.*    
            FROM users_products
                JOIN products
                    ON users_products.product_id = products.id
            WHERE users_products.user_id = $1
        ;`, [userId]);
        result = { ...result, products: products.rows };
        const deliveryDates = calculateDeliveryDates(result.planId, result.deliveryType);
        return res.send({ ...result, deliveryDates });
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
