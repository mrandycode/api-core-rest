const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const image = Joi.string().optional().allow('');
const license = Joi.string().optional().allow('').max(50);
const birthday = Joi.string().optional().allow('');
const genre = Joi.string().optional().allow('').max(1);
const breed = Joi.string().optional().allow('').max(100);
const color = Joi.string().optional().allow('').max(50);
const age = Joi.string().optional().allow('').max(20);
const reward = Joi.boolean().optional().allow(false);
// const profileId = Joi.number().integer();
// const isNew = Joi.boolean();

const getPetPatientProfileSchemaById = Joi.object({
    id: id
});

const createPetPatientProfileSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    image,
    license,
    birthday,
    genre,
    breed,
    color,
    age,
    reward,
    // profileId: profileId.required()
});

const updatePetProfileProfileSchema = Joi.object({
    id,
    name: name.required(),
    image,
    license,
    birthday,
    genre,
    breed,
    color,
    age,
    reward,
    // profileId
});


module.exports = {
    getPetPatientProfileSchemaById,
    createPetPatientProfileSchema,
    updatePetProfileProfileSchema
}