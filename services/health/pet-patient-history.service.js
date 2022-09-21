const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
// const constants = require('../shared/constants');

class PetMedicalHistoryService {
    constructor() { }

    async find() {
        const petMedicalStories =
            await models.PetMedicalHistory.findAll();
        return petMedicalStories;
    }

    async findOne(id) {
        const petMedicalHistory =
            await models.PetMedicalHistory.findByPk(id);
        if (!petMedicalHistory) {
            throw boom.notFound('Profile not found');
        }
        return petMedicalHistory;
    }

    async create(request) {
        let response;
        const newPetMedicalHistory =
            await models.PetMedicalHistory.create(request);
        if (newPetMedicalHistory) {
            response = await this.findOne(newPetMedicalHistory.id);
        }
        return response;
    }

    async update(id, request) {
        const petMedicalHistory = await this.findOne(id);
        if (petMedicalHistory) {
            const response = await models.PetMedicalHistory.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const petMedicalHistory = await this.findOne(id);
        await petMedicalHistory.destroy();
        return { response: true };
    }
}
module.exports = PetMedicalHistoryService;