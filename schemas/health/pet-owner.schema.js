const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const lastName = Joi.string().max(100);
const dni = Joi.string().max(20);
const image = Joi.string().optional().allow('');
const birthday = Joi.string().optional().allow('');
const genre = Joi.string().optional().allow('');
const mobile = Joi.string().optional().allow('').max(50);
const phone = Joi.string().optional().allow('').max(50);
const email = Joi.string().optional().allow('').email().max(64);
const city = Joi.string().optional().allow('').max(100);
const state = Joi.string().optional().allow('').max(100);
const zip = Joi.string().optional().allow('').max(20);
const address = Joi.string().optional().allow('').max(1000);
const userId = Joi.number().integer();
const profileId = Joi.number().integer();
const isNew = Joi.boolean();

const getOwnerSchemaById = Joi.object({
    id: id.required(),
});

const getOwnerSchemaByForm = Joi.object({
    dni,
    lastName,
    email,
    userId
});

const getOwnerSchemaByDni = Joi.object({
    dni,
    isNew
});

const createOwnerSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    lastName: lastName.required(),
    dni: dni.required(),
    image,
    birthday: birthday.required(),
    genre,
    mobile,
    phone,
    email,
    city,
    state,
    zip,
    address,
});

const updateOwnerSchema = Joi.object({
    id: id.required(),
    country,
    name,
    lastName,
    image,
    birthday,
    genre,
    mobile,
    phone,
    email,
    city,
    state,
    zip,
    address,
    // userId: userId.required(),
    // profileId,
    // isNew
});

module.exports = {
    getOwnerSchemaById,
    getOwnerSchemaByForm,
    getOwnerSchemaByDni,
    createOwnerSchema,
    updateOwnerSchema
}
