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

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newPersonalProfile = await models.PersonalProfile.create(data);
        return newPersonalProfile;
        // }
    }

    async update(id, changes) {
        const personalProfile = await this.findOne(id);
        const response = await personalProfile.update(changes);
        return response;
    }

    async delete(id) {
        const personalProfile = await this.findOne(id);
        await personalProfile.destroy();
        return { response: true };
    }
}
module.exports = PersonalProfileService;