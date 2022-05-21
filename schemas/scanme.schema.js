const Joi = require('joi');

const id = Joi.number();
const lng = Joi.number();
const lat = Joi.number();
const hostname = Joi.string();
const ip = Joi.string();

const getScanMeSchema = Joi.object({
    id: id.required(),
    lng,
    lat,
    hostname,
    ip
});

module.exports = { getScanMeSchema }