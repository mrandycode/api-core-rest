const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const notes = Joi.string().max(2000);
const personalProfileId = Joi.number().integer();


const getAllergySchemaById = Joi.object({
    id: id.required()
});

const createAllergySchema = Joi.object({
    country: country.required(),
    name: name.required(),
    notes: notes.required(),
    personalProfileId: personalProfileId.required()
});

const updateAllergySchema = Joi.object({
    name,
    notes

});

module.exports = {
    getAllergySchemaById,
    createAllergySchema,
    updateAllergySchema
}