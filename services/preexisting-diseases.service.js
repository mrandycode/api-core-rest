const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PreexistingDiseasesService {
    constructor() { }

    async find() {
        const response = await models.PreexistingDisease.findAll({
            // include: ['personalProfile']
        });
        return response;
    }

    async findOne(id) {
        const preexistingDisease = await models.PreexistingDisease.findByPk(id, {
            // include: ['personalProfile']
        });
        if (!preexistingDisease) {
            throw boom.notFound('PreexistingDiseases not found');
        }
        return preexistingDisease;
    }

    async create(data) {
        const newPreexistingDiseases = await models.PreexistingDisease.create(data);
        return newPreexistingDiseases;
    }

    async update(id, request) {
        const preexistingDisease = await this.findOne(id);
        if (preexistingDisease) {
            const response = await preexistingDisease.update(request,
                { where: { id: request.id } }
            );
            return response;
        } else {
            return [0];
        }

    }

    async delete(id) {
        const preexistingDisease = await this.findOne(id);
        await preexistingDisease.destroy();
        return { response: true };
    }
}
module.exports = PreexistingDiseasesService;