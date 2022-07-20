const Joi = require('joi')
    .extend(require('@joi/date'));

const id = Joi.number().integer();
const country = Joi.string().max(4);
const appointmentDate = ('DD-MM-YYYY ').utc();
const reasonId = Joi.integer();
const reasonDescription = Joi.string().optional().allow('').max(2000);
const treatment = Joi.string().optional().allow('').max(2000);
const personalPatientProfileId = Joi.number().integer();

const getPersonalMedicalHistorySchema = Joi.object({
    id: id.required()
});

const createPersonalMedicalHistorySchema = Joi.object({
    id: id.required(),
    country: country.required(),
    appointmentDate: appointmentDate.required(),
    reasonId,
    reasonDescription,
    treatment,
    personalPatientProfileId: personalPatientProfileId.required()


});

const updatePersonalMedicalHistorySchema = Joi.object({
    id: id.required(),
    country: country.required(),
    appointmentDate: appointmentDate.required(),
    reasonId,
    reasonDescription,
    treatment,
});

module.exports = {
    getPersonalMedicalHistorySchema,
    createPersonalMedicalHistorySchema,
    updatePersonalMedicalHistorySchema
}
