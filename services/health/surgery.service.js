const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class SurgeryService {
    constructor() { }

    async find() {
        const surgeries =
            await models.Surgery.findAll();
        return surgeries;
    }

    async findOne(id) {
        const surgery =
            await models.Surgery.findByPk(id);
        if (!surgery) {
            throw boom.notFound('Profile not found');
        }
        return surgery;
    }

    async create(request) {
        let response;
        const surgery =
            await models.Surgery.create(request);
        if (surgery) {
            response = await this.findOne(surgery.id);
        }
        return response;
    }

    async update(id, request) {
        const surgery = await this.findOne(id);
        if (surgery) {
            const response = await models.Surgery.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const surgery = await this.findOne(id);
        await surgery.destroy();
        return { response: true };
    }
}
module.exports = SurgeryService;