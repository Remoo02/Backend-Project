const Joi = require('joi');

const skiCreateSchema = Joi.object({
    brand: Joi.string().min(2).max(50).required(),
    model: Joi.string().min(1).max(100).required(),
    length: Joi.number().integer().min(120).max(220).required(),
    category: Joi.string().valid('all-mountain', 'race', 'touring', 'freeride').required(),
    skillLevel: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').required(),
    price: Joi.number().min(0).required(),
    inStock: Joi.boolean().optional()
});

const skiUpdateSchema = skiCreateSchema.fork(
    ['brand', 'model', 'length', 'category', 'skillLevel', 'price'],
    (schema) => schema.optional()
);

module.exports = { skiCreateSchema, skiUpdateSchema };
