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

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newPreexistingDiseases = await models.PreexistingDiseases.create(data);
        return newPreexistingDiseases;
        // }
    }

    async update(id, changes) {
        const preexistingDisease = await this.findOne(id);
        const response = await preexistingDisease.update(changes);
        return response;
    }

    async delete(id) {
        const preexistingDisease = await this.findOne(id);
        await preexistingDisease.destroy();
        return { response: true };
    }
}
module.exports = PreexistingDiseasesService;