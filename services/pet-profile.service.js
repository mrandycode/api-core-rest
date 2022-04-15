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
        let response;
        const newPetProfile = await models.PetProfile.create(data);
        if (newPetProfile) {
            response = await this.findOne(newPetProfile.id);
        }
        return response;
    
    }

    async update(id, request) {
        const petProfile = await this.findOne(id);
        if (petProfile) {
            const response = await models.PetProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const petProfile = await this.findOne(id);
        await petProfile.destroy();
        return { response: true };
    }
}
module.exports = PetProfileService;