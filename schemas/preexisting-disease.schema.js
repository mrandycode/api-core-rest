const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const condition = Joi.string().max(200);
const treatment = Joi.string().max(2000);
const personalProfileId = Joi.number().integer();


const getPreexistingDiseaseSchemaById = Joi.object({
    id: id.required()
});

const createPreexistingDiseaseSchema = Joi.object({
    country: country.required(),
    condition: condition.required(),
    treatment: treatment.required(),
    personalProfileId: personalProfileId.required()
});

const updatePreexistingDiseaseSchema = Joi.object({
    condition: condition,
    treatment: treatment
});


module.exports = {
    getPreexistingDiseaseSchemaById,
    createPreexistingDiseaseSchema,
    updatePreexistingDiseaseSchema
}