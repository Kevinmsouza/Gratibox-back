import Joi from 'joi';

function validatePlan(plan) {
    const planSchema = Joi.object({
        planId: Joi.number().integer().required(),
        deliveryType: Joi.number().integer().required(),
        fullName: Joi.string().required(),
        postalCode: Joi.string().pattern(/[0-9]{5}-[0-9]{3}/).required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        stateId: Joi.number().integer().required(),
        products: Joi.array().items(Joi.number().integer()).required(),
    });
    return !!planSchema.validate(plan).error;
}

export {
    validatePlan,
};
