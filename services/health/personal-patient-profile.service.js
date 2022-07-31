const boom = require('@hapi/boom');
const { models, Op } = require('../../libs/sequelize');
const constants = require('../../shared/constants');

class PersonalPatientProfileService {
    constructor() { }

    async find() {
        const personalPatientProfiles =
            await models.PersonalPatientProfile.findAll();
        return personalPatientProfiles;
    }

    async findOne(id) {
        const personalPatientProfile =
            await models.PersonalPatientProfile.findByPk(id, {
                include: [...constants.PERSONAL_PATIENT_PROFILE]
            });
        if (!personalPatientProfile) {
            throw boom.notFound('Profilesss not found');
        }
        return personalPatientProfile;
    }

    async findByFormTemplate(request, req) {
        const personalPatientProfiles =
            await models.PersonalPatientProfile.findAll({
                where: {
                    [Op.or]: [
                        { dni: request.dni || null },
                        { email: request.email || null },
                        { lastName: { [Op.like]: `%${request.lastName || null}%` } }
                    ],

                }
            });

        if (personalPatientProfiles.length < 1) {
            throw boom.notFound(req.t('NOT_FOUND'));
        }

        return personalPatientProfiles;
    }

    async create(request) {
        let response;
        const newPersonalPatientProfile =
            await models.PersonalPatientProfile.create(request);
        if (newPersonalPatientProfile) {
            response = await this.findOne(newPersonalPatientProfile.id);
        }
        return response;
    }

    async update(id, request) {
        const personalPatientProfile = await this.findOne(id);
        if (personalPatientProfile) {
            const response = await models.PersonalPatientProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const personalPatientProfile = await this.findOne(id);
        await personalPatientProfile.destroy();
        return { response: true };
    }
}
module.exports = PersonalPatientProfileService;