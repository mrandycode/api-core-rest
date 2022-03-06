const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const fullName = Joi.string().max(100);
const relationship = Joi.string().max(50);
const mobile = Joi.string().max(50);
const phone = Joi.string().optional().allow('').max(50);
const address = Joi.string().optional().allow('').max(1000);
const email = Joi.string().optional().allow('').email().max(64);
const personalProfileId = Joi.number().integer();
const petProfileId = Joi.number().integer();
const articleProfileId = Joi.number().integer();

const getEmergencyContactSchemaById = Joi.object({
    id: id.required()
});

const createEmergencyContactSchema = Joi.object({
    country: country.required(),
    fullName: fullName.required(),
    relationship: relationship.required(),
    mobile: mobile.required(),
    phone,
    address,
    email,
    personalProfileId,
    petProfileId,
    articleProfileId
});

const updateEmergencyContactSchema = Joi.object({
    fullName,
    relationship,
    mobile,
    phone,
    address,
    email
});


module.exports = {
    getEmergencyContactSchemaById,
    createEmergencyContactSchema,
    updateEmergencyContactSchema
}