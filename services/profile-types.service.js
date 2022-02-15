const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProfileTypeService {
    constructor() { }

    async find() {
        const response = await models.ProfileType.findAll();
        return response;
    }

    async findOne(id) {
        const profileType = await models.ProfileType.findByPk(id);
        if (!profileType) {
            throw boom.notFound('profileType not found');
        }
        return profileType;
    }
}
module.exports = ProfileTypeService;