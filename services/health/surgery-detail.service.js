const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
// const constants = require('../shared/constants');

class SurgeryDetailService {
    constructor() { }

    async find() {
        const surgeryDetails =
            await models.SurgeryDetail.findAll();
        return surgeryDetails;
    }

    async findOne(id) {
        const surgeryDetail =
            await models.SurgeryDetail.findByPk(id);
        if (!surgeryDetail) {
            throw boom.notFound('Profile not found');
        }
        return surgeryDetail;
    }

    async create(request) {
        let response;
        const surgeryDetail =
            await models.SurgeryDetail.create(request);
        if (surgeryDetail) {
            response = await this.findOne(surgeryDetail.id);
        }
        return response;
    }

    async update(id, request) {
        const surgeryDetail = await this.findOne(id);
        if (surgeryDetail) {
            const response = await models.SurgeryDetail.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const surgeryDetail = await this.findOne(id);
        await surgeryDetail.destroy();
        return { response: true };
    }
}
module.exports = SurgeryDetailService;