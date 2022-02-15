const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const status = Joi.number().integer(1);

const getProfileTypeSchemaById = Joi.object({
    id: id.required()
});


module.exports = { getProfileTypeSchemaById }