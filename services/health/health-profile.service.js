const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
// const constants = require('../shared/constants');

class HealthProfileService {
    constructor() { }

    async find() {
        const healthProfiles = await models.HealthProfile.findAll({
            // include: [...constants.PERSONAL_PROFILE]
        });
        return healthProfiles;
    }

    async findOne(id) {
        const healthProfile = await models.HealthProfile.findByPk(id, {
            // include: [...constants.PERSONAL_PROFILE]
        });
        if (!healthProfile) {
            throw boom.notFound('Profile not found');
        }
        return healthProfile;
    }

    async create(request) {    
        let response;
        const newHealthProfile = await models.HealthProfile.create(request);
        if (newHealthProfile) {
            response = await this.findOne(newHealthProfile.id);
        }
        return response;
    }

    async update(id, request) {
        const healthProfile = await this.findOne(id);
        if (healthProfile) {
            const response = await models.HealthProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const healthProfile = await this.findOne(id);
        await healthProfile.destroy();
        return { response: true };
    }
}
module.exports = HealthProfileService;