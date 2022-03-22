const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');

class PersonalProfileService {
    constructor() { }

    async find() {
        const personalProfiles = await models.PersonalProfile.findAll({
            include: [...constants.PERSONAL_PROFILE]

        });
        return personalProfiles;
    }

    async findOne(id) {
        const personalProfile = await models.PersonalProfile.findByPk(id, {
            include: [...constants.PERSONAL_PROFILE]
        });
        if (!personalProfile) {
            throw boom.notFound('Profile not found');
        }
        return personalProfile;
    }

    async create(data) {
        let response;
        const newPersonalProfile = await models.PersonalProfile.create(data);
        if (newPersonalProfile) {
            response = await this.findOne(newPersonalProfile.id);
        }
        return response;

    }

    async update(id, request) {
        const personalProfile = await this.findOne(id);
        if (personalProfile) {
            const response = await models.PersonalProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const personalProfile = await this.findOne(id);
        await personalProfile.destroy();
        return { response: true };
    }
}
module.exports = PersonalProfileService;