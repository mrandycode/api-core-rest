const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const frecuency = Joi.string().max(200);
const dose = Joi.string().max(50);
const personalProfileId = Joi.number().integer();
const petProfileId = Joi.number().integer();
const userId = Joi.number().integer();

const getMedicationSchemaById = Joi.object({
    id: id.required()
});

const createMedicationSchema = Joi.object({
    country: country.required(),
    name: name.required(),
    frecuency: frecuency.required(),
    dose: dose.required(),
    personalProfileId,
    petProfileId
});

const updateMedicationSchema = Joi.object({
    name,
    frecuency,
    dose

});

const deleteMedicationSchema = Joi.object({
    id: id.required(),
    userId: userId.required()
});


module.exports = {
    getMedicationSchemaById,
    createMedicationSchema,
    updateMedicationSchema,
    deleteMedicationSchema
}