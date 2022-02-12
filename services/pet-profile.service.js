const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');


class PetProfileService {
    constructor() { }

    async find() {
        const petProfiles = await models.PetProfile.findAll({
            include: [...constants.PET_PROFILE]

        });
        return petProfiles;
    }

    async findOne(id) {
        const petProfile = await models.PetProfile.findByPk(id, {
            include: [...constants.PET_PROFILE]
        });
        if (!petProfile) {
            throw boom.notFound('Profile not found');
        }
        return petProfile;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newPetProfile = await models.PetProfile.create(data);
        return newPetProfile;
        // }
    }

    async update(id, changes) {
        const petProfile = await this.findOne(id);
        const response = await petProfile.update(changes);
        return response;
    }

    async delete(id) {
        const petProfile = await this.findOne(id);
        await petProfile.destroy();
        return { response: true };
    }
}
module.exports = PetProfileService;