import { planFactory } from '../factories/plan.factory.js';
import { validatePlan } from '../validation/plans.js';

async function postPlan(req, res) {
    const { userId } = res.locals;
    if (validatePlan(req.body)) return res.sendStatus(400);
    const httpCode = await planFactory({ ...req.body, userId });
    return res.sendStatus(httpCode);
}

export {
    postPlan,
};
