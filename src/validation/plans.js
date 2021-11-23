import Joi from 'joi';

function validatePlan(plan) {
    const planSchema = Joi.object({
        planId: Joi.number().integer().min(1).max(2)
            .required(),
        deliveryType: Joi.number().integer().min(1).max(3)
            .required(),
        fullName: Joi.string().required(),
        postalCode: Joi.string().pattern(/[0-9]{5}-[0-9]{3}/).required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        stateId: Joi.number().integer().min(1).max(27)
            .required(),
        products: Joi.array().items(Joi.number().integer()).required(),
    });
    return !!planSchema.validate(plan).error;
}

export {
    validatePlan,
};
