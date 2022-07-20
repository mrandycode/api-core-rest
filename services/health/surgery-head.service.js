const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const constants = require('../shared/constants');

class SurgeryHeadService {
    constructor() { }

    async find() {
        const surgeryHeaders =
            await models.SurgeryHead.findAll();
        return surgeryHeaders;
    }

    async findOne(id) {
        const surgeryHead =
            await models.SurgeryHead.findByPk(id, {
                include: [constants.SURGERY_HEAD]
            });
        if (!surgeryHead) {
            throw boom.notFound('Profile not found');
        }
        return surgeryHead;
    }

    async create(request) {
        let response;
        const surgeryHead =
            await models.SurgeryHead.create(request);
        if (surgeryHead) {
            response = await this.findOne(surgeryHead.id);
        }
        return response;
    }

    async update(id, request) {
        const surgeryHead = await this.findOne(id);
        if (surgeryHead) {
            const response = await models.SurgeryHead.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const surgeryHead = await this.findOne(id);
        await surgeryHead.destroy();
        return { response: true };
    }
}
module.exports = SurgeryHeadService;