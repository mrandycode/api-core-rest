const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const appointmentDate =Joi.string().optional().allow('');
const reasonId = Joi.number().integer();
const reasonDescription = Joi.string().optional().allow('').max(2000);
const treatment = Joi.string().optional().allow('').max(2000);
const personalPatientProfileId = Joi.number().integer();
const userId = Joi.number().integer();

const getPersonalMedicalHistorySchema = Joi.object({
    id: id.required()
});

const createPersonalMedicalHistorySchema = Joi.object({
    id: id.required(),
    country,
    appointmentDate: appointmentDate.required(),
    reasonId,
    reasonDescription,
    treatment,
    personalPatientProfileId: personalPatientProfileId.required(),
    userId: userId.required()
});

const updatePersonalMedicalHistorySchema = Joi.object({
    id: id.required(),
    country: country.required(),
    appointmentDate: appointmentDate.required(),
    reasonId,
    reasonDescription,
    treatment,
    personalPatientProfileId: personalPatientProfileId.required(),
    userId: userId.required()
});

module.exports = {
    getPersonalMedicalHistorySchema,
    createPersonalMedicalHistorySchema,
    updatePersonalMedicalHistorySchema
}
