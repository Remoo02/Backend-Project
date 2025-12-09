// src/middleware/validate.middleware.js
module.exports = (schema) => (req, res, next) => {
    const options = { abortEarly: false, stripUnknown: true };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        });
    }

    req.body = value;
    next();
};
