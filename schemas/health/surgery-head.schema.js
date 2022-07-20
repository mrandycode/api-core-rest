
const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().optional().allow('').max(2000);
const type = Joi.integer()

const getSurgeryHeadSchema = Joi.object({
    id: id.required()
});

const createSurgeryHeadSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    type: type.required()
});

const updateSurgeryHeadSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    type: type.required()
});

module.exports = {
    getSurgeryHeadSchema,
    createSurgeryHeadSchema,
    updateSurgeryHeadSchema
}
