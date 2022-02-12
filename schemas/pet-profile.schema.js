const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const image = Joi.string();
const birthday = Joi.string();
const genre = Joi.string();
const breed = Joi.string().max(100);
const color = Joi.string().max(50);
const age = Joi.string().max(20);
const reward = Joi.boolean();
const profileId = Joi.number().integer();

const getPetProfileSchemaById = Joi.object({
    id: id
});

const createPetProfileSchema = Joi.object({
    country: country.required(),
    name: name.required(),
    image,
    birthday: birthday.required(),
    genre,
    breed,
    color,
    age,
    reward,
    profileId: profileId.required()
});

const updatePetProfileSchema = Joi.object({
    image,
    birthday,
    genre,
    breed,
    color,
    age,
    reward,
});


module.exports = { getPetProfileSchemaById, createPetProfileSchema, updatePetProfileSchema }