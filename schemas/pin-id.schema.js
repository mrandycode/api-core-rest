const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const qtyRows = Joi.number().integer(4).min(1).max(1000);
const pinProfile = Joi.number().integer(4).messages({'any.required': 'PIN_REQUIRED'});
const idProfile = Joi.string().min(7).max(7);
const status = Joi.number().integer(1);
const profileId = Joi.number();


const getPinIdSchemaByCountry = Joi.object({
    country: country.required()
});

const generatePinIdSchema = Joi.object({
    country: country.required(),
    qtyRows: qtyRows.required()
});

const getPinIdSchema = Joi.object({
    idProfile: idProfile.required(),
    pinProfile: pinProfile.required()
});

const updatePinIdSchema = Joi.object({
    id: id.required(),
    status: status.required(),
    profileId
});

module.exports = { getPinIdSchemaByCountry, generatePinIdSchema, getPinIdSchema, updatePinIdSchema }