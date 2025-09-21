const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    displayName: Joi.string().min(2).max(50),
    photoURL: Joi.string().uri().allow('')
});

const loginSchema = Joi.object({
    firebaseToken: Joi.string().required()
});

const updateProfileSchema = Joi.object({
    displayName: Joi.string().min(2).max(50),
    photoURL: Joi.string().uri().allow('')
});

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        next();
    };
};

module.exports = {
    validateRegister: validate(registerSchema),
    validateLogin: validate(loginSchema),
    validateUpdateProfile: validate(updateProfileSchema)
};