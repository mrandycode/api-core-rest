const Joi = require('joi');

const id = Joi.number().integer();

const getUserSchemaById = Joi.object({
    id: id.required()
});


module.exports = { getUserSchemaById }