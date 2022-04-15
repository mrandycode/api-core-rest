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
const city = Joi.string().optional().allow('').max(100);
const state = Joi.string().optional().allow('').max(100);
const zip = Joi.string().optional().allow('').max(20);
const address = Joi.string().optional().allow('').max(1000);
const profileId = Joi.number().integer();

const getPetProfileSchemaById = Joi.object({
    id: id
});

const createPetProfileSchema = Joi.object({
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
    city,
    state,
    zip,
    address,
    profileId: profileId.required()
});

const updatePetProfileSchema = Joi.object({
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
    city,
    state,
    zip,
    address,
    profileId
});


module.exports = { getPetProfileSchemaById, createPetProfileSchema, updatePetProfileSchema }