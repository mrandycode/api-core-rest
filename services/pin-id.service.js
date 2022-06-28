const boom = require('@hapi/boom');
const { models, Op } = require('../libs/sequelize');
const { QueryTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

class PinIdService {

    constructor() { }

    async findOne(id) {
        const pinIdProfile = await models.PersonalProfile.findByPk(id);
        if (!pinIdProfile) {
            throw boom.notFound('Profile not found');
        }
        return pinIdProfile;
    }

    async generate(body) {
        let rta = {};
        const query = 'CALL sp_GeneratePinId (:country, :qtyRows, @res)';
        await sequelize.query(query, {
            replacements: { country: body.country, qtyRows: body.qtyRows },
            type: QueryTypes.INSERT,
            raw: true
        }).then((response) => {
            console.log(response);
            rta.message = response;
            return rta;

        });

    }

    async findAvailable(limit) {
        const response = await models.PinIdProfile.findAll({
            where: {
                status: 2
            },
            limit: limit
        }, { order: [['id', 'DESC']] });

        if (!response) {
            throw boom.notFound('NOT_FOUND');
        }

        return response;
    }

    async findAvailableByDate(limit, date) {
        const response = await models.PinIdProfile.findAll({
            where: {
                createdAt: { [Op.gte]: date },
                status: 2
            }, limit,
        }, { order: [['id', 'DESC']] });

        if (!response) {
            throw boom.notFound('NOT_FOUND');
        }

        return response;
    }

    async findByPinId(qrId, qrPin, req) {
        const response = await models.PinIdProfile.findOne({
            where: { pinProfile: qrPin, idProfile: qrId }
        });
        if (!response) {
            throw boom.notFound(req.t('PROFILE_NOT_FOUND'));
        }

        return response;
    }

    async update(request) {
        // const pinId = await this.findOne(request['id']);
        // if (pinId) {
        const response = await models.PinIdProfile.update(request,
            { where: { id: request['id'] } });
        return response;
        // } else {
        //     return [0]
        // }
    }
}

module.exports = PinIdService;