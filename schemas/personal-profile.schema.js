const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const lastName = Joi.string().max(100);
const image = Joi.string();
const birthday = Joi.string();
const genre = Joi.string();
const bloodType = Joi.string().max(20);
const eyeColor = Joi.string().max(20);
const mobile = Joi.string().max(50);
const phone = Joi.string().max(50);
const email = Joi.string().email().max(64);
const address = Joi.string().max(1000);
const profileId = Joi.number().integer();

const getPersonalProfileSchemaById = Joi.object({
    id: id.required()
});

const createPersonalProfileSchema = Joi.object({
    country: country.required(),
    name: name.required(),
    lastName: lastName.required(),
    image,
    birthday: birthday.required(),
    genre,
    bloodType,
    eyeColor,
    mobile,
    phone,
    email,
    address,
    profileId: profileId.required()
});

const updatePersonalProfileSchema = Joi.object({
    name,
    lastName,
    image,
    birthday,
    genre,
    bloodType,
    eyeColor,
    mobile,
    phone,
    email,
    address
});


module.exports = { getPersonalProfileSchemaById, createPersonalProfileSchema, updatePersonalProfileSchema }