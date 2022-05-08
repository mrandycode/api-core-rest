const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const notes = Joi.string().max(2000);
const personalProfileId = Joi.number().integer();
const petProfileId = Joi.number().integer();
const userId = Joi.number().integer();

const getAllergySchemaById = Joi.object({
    id: id.required()
});

const createAllergySchema = Joi.object({
    name: name.required(),
    notes: notes.required(),
    personalProfileId,
    petProfileId
});

const updateAllergySchema = Joi.object({
    country,
    name,
    notes,
    personalProfileId,
    petProfileId,

});

const deleteAllergySchema = Joi.object({
    id: id.required(),
    userId: userId.required()
});

module.exports = {
    getAllergySchemaById,
    createAllergySchema,
    updateAllergySchema,
    deleteAllergySchema
}