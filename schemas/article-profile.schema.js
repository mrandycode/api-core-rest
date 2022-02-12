const Joi = require('joi');

const id = Joi.number().integer();
const country = Joi.string().max(4);
const name = Joi.string().max(50);
const brand = Joi.string().max(50);
const model = Joi.string().max(50);
const type = Joi.string().max(20);
const serial = Joi.string().max(20);
const image = Joi.string();
const color = Joi.string().max(50);
const reward = Joi.boolean();
const profileId = Joi.number().integer();

const getArticleProfileSchemaById = Joi.object({
    id: id
});

const createArticleProfileSchema = Joi.object({
    country: country.required(),
    name: name.required(),
    brand,
    model,
    type,
    serial,
    image,
    color,
    reward,
    profileId: profileId.required()
});

const updateArticleProfileSchema = Joi.object({
    name,
    brand,
    model,
    type,
    serial,
    image,
    color,
    reward,
});


module.exports = {
    getArticleProfileSchemaById,
    createArticleProfileSchema,
    updateArticleProfileSchema
}