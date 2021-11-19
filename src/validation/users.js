import Joi from 'joi';

function validateUser(user) {
    const userSchema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });
    return !!userSchema.validate(user).error;
}

export {
    validateUser,
};
