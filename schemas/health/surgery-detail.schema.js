
const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().optional().allow('').max(2000);
const surgeryHeadId = Joi.integer();

const getSurgeryDetailSchema = Joi.object({
    id: id.required()
});

const createSurgeryDetailSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    surgeryHeadId: surgeryHeadId.required()
});

const updateSurgeryDetailSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    surgeryHeadId: surgeryHeadId.required()
});

module.exports = {
    getSurgeryDetailSchema,
    createSurgeryDetailSchema,
    updateSurgeryDetailSchema
}
