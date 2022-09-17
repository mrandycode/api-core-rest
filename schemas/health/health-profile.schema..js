const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const personalPatientProfileId = Joi.number().integer();
const petPatientProfileId = Joi.number().integer();
const profileId = Joi.number().integer();

const getHealthProfileByIdSchema = Joi.object({
    id: id.required()
});

const createHealthProfileSchema = Joi.object({
    country: country.required(),
    personalPatientProfileId,
    petPatientProfileId,
    profileId: profileId.required()
});

const updateHealthProfileSchema = Joi.object({
    country,
    personalPatientProfileId,
    petPatientProfileId,
    profileId
});

module.exports = {
    getHealthProfileByIdSchema,
    createHealthProfileSchema,
    updateHealthProfileSchema
}