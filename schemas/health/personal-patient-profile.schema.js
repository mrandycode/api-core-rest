const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(100);
const lastName = Joi.string().max(100);
const dni = Joi.string().max(20);
const image = Joi.string().optional().allow('' || null);
const birthday = Joi.string().optional().allow('' || null);
const genre = Joi.string().optional().allow('' || null);
const bloodType = Joi.string().optional().allow('' || null).max(20);
const eyeColor = Joi.string().optional().allow('' || null).max(20);
const mobile = Joi.string().optional().allow('' || null).max(50);
const phone = Joi.string().optional().allow('' || null).max(50);
const email = Joi.string().optional().allow('' || null).email().max(64);
const city = Joi.string().optional().allow('' || null).max(100);
const state = Joi.string().optional().allow('' || null).max(100);
const zip = Joi.string().optional().allow('' || null).max(20);
const address = Joi.string().optional().allow('' || null).max(1000);
const vaccineCovid = Joi.string().optional().allow('' || null).max(20);
const doseQtyCovid = Joi.number().integer().optional().allow('' || null).max(20);
const userId = Joi.number().integer();
const profileId = Joi.number().integer();
const isNew = Joi.boolean();

const getPersonalPatientProfileSchemaById = Joi.object({
    id: id.required(),
    userId: userId.required()
});

const getPatientProfileSchemaByForm = Joi.object({
    dni,
    lastName,
    email,
    userId
});

const createPersonalPatientProfileSchema = Joi.object({
    id: id.required(),
    country: country.required(),
    name: name.required(),
    lastName: lastName.required(),
    dni: dni.required(),
    image,
    birthday: birthday.required(),
    genre,
    bloodType,
    eyeColor,
    mobile,
    phone,
    email,
    city,
    state,
    zip,
    address,
    vaccineCovid,
    doseQtyCovid,
    userId: userId.required(),
    profileId: profileId.required()
});

const updatePersonalPatientProfileSchema = Joi.object({
    id: id.required(),
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
    city,
    state,
    zip,
    address,
    vaccineCovid,
    doseQtyCovid,
    userId: userId.required(),
    profileId,
    isNew
});

module.exports = {
    getPersonalPatientProfileSchemaById,
    getPatientProfileSchemaByForm,
    createPersonalPatientProfileSchema,
    updatePersonalPatientProfileSchema
}
