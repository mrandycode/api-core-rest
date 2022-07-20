
const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().optional().allow('').max(2000);
const personalPatientProfileId = Joi.integer();

const getSurgerySchema = Joi.object({
    id: id.required()
});

const createSurgerySchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    personalPatientProfileId: personalPatientProfileId.required()
});

const updateSurgerySchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    personalPatientProfileId: personalPatientProfileId.required()
});

module.exports = {
    getSurgerySchema,
    createSurgerySchema,
    updateSurgerySchema
}
