const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const qrId = Joi.string().max(7);
const pinId = Joi.number().integer();
const profileType = Joi.number().integer(1);
const userId = Joi.number().integer();

const getProfileSchema = Joi.object({
    id: id.required()
});

const createProfileSchema = Joi.object({
    country: country.required(),
    qrId: qrId.required(),
    pinId: pinId.required(),
    profileType: profileType.required(),
    userId: userId.required()
});

const updateProfileSchema = Joi.object({
    country,
    qrId,
    pinId,
    userId
});

module.exports = { getProfileSchema, createProfileSchema, updateProfileSchema }