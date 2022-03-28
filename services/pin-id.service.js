const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
        console.log(body, 'body in generate');
        const query = 'CALL sp_GeneratePinId (:country, :qtyRows, @res)';
        await models.query(query, {
            replacements: { country: body.country, qtyRows: body.qtyRows },
            type: models.QueryTypes.INSERT
        }).then((response) => {
            console.log(response, 'response---sp_GeneratePinId')
        })

    }

    async findByCountry(country, limit) {
        const response = await models.PinIdProfile.findAll({
            where: { country }, limit: limit
        }, { order: [['id', 'DESC']] });

        if (!response) {
            throw boom.notFound('No hay registros para este pais');
        }

        return response;
    }

    async findByPinId(qrId, qrPin) {
        const response = await models.PinIdProfile.findOne({
            where: { pinProfile: qrPin, idProfile: qrId }
        });

        if (!response) {
            throw boom.notFound('No hay registros');
        }

        return response;
    }

    async update(request) {
        const pinId = await this.findOne(request['id']);
        console.info(pinId, 'pinId, update');
        if (pinId) {
            const response = await models.PinIdProfile.update(request,
                { where: { id: request['id'] } });
            return response;
        } else {
            return [0]
        }
    }
}

module.exports = PinIdService;