const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const qtyRows = Joi.number().integer(4).min(1).max(1000);


const getPinIdSchemaByCountry= Joi.object({
    country: country.required()
});

const generatePinIdSchema= Joi.object({
    country: country.required(),
    qtyRows: qtyRows.required()
});

module.exports = { getPinIdSchemaByCountry, generatePinIdSchema }