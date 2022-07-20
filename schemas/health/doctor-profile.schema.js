const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
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
const qtyQrGiven = Joi.number().integer(10).optional();
const specialty = Joi.string().optional().allow('').max(1000);
const userId = Joi.number().integer();

const getDoctorProfileSchemaById = Joi.object({
    id: id.required()
});

const createDoctorProfileSchema = Joi.object({
    id: id.required(),
    country: country.required(),
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
    qtyQrGiven,
    specialty,
    userId: userId.required()
});

const updateDoctorProfileSchema = Joi.object({
    id,
    country,
    dni,
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
    qtyQrGiven,
    specialty,
    userId
});

module.exports = {
    getDoctorProfileSchemaById,
    createDoctorProfileSchema,
    updateDoctorProfileSchema
}