const boom = require('@hapi/boom');
const { models, Op } = require('../../libs/sequelize');
const { PersonalMedicalHistory } = require('../../db/models/health/personal-medical-history.model')
const constants = require('../../shared/constants');

class PersonalPatientProfileService {
    constructor() { }

    async find() {
        const personalPatientProfiles =
            await models.PersonalPatientProfile.findAll();
        return personalPatientProfiles;
    }

    async findOne(request) {
        const personalPatientProfile =
            await models.PersonalPatientProfile.findByPk(request.id, {
                include: [...constants.PERSONAL_PATIENT_PROFILE,
                {
                    model: models.PersonalMedicalHistory,
                    as: 'personalMedicalStories',
                    where: { userId: request.userId }
                }],
                order: [
                    [{
                        model: PersonalMedicalHistory,
                        as: 'personalMedicalStories',
                    },
                        'appointmentDate', 'desc'],
                ],
            });
        if (!personalPatientProfile) {
            throw boom.notFound('Profilesss not found');
        }
        return personalPatientProfile;
    }

    async findByFormTemplate(request, req) {
        let options = null;
        let filterFinal = {};
        const filterProfileNotNew = {
            userId: request.userId,
        }
        const filterProfileNew = {
            userId: { [Op.ne]: request.userId }
        }

        const operatorOr = [
            { dni: request.dni || null },
            { email: request.email || null },
            { lastName: { [Op.like]: `%${request.lastName || null}%` } }
        ];


        if (!request.isNew) {
            filterFinal = filterProfileNotNew;
        } else {
            filterFinal = filterProfileNew;
        }

        let filterProfiles = [...constants.PERSONAL_PATIENT_PROFILE, {
            model: models.HealthProfile,
            as: 'healthProfiles',
            include: ['profile', {
                model: models.Profile,
                as: 'profile',
                where: filterFinal,
            }
            ]
        }];

        if (!request.isNew) {
            options = {
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$healthProfiles.profile.user_id$': request.userId },
                },
                include: filterProfiles
            }

        } else {
            options = {
                where: {
                    '$healthProfiles.profile.user_id$': { [Op.ne]: request.userId },
                    [Op.or]: operatorOr,
                },
                include: filterProfiles
            }
        }

        const personalPatientProfiles =
            await models.PersonalPatientProfile.findAll(options);

        if (personalPatientProfiles.length < 1) {
            throw boom.notFound(req.t('NOT_FOUND'));
        }

        return personalPatientProfiles;
    }

    async getPatientsLimited(request, req) {
        const personalPatientProfiles =
            await models.PersonalPatientProfile.findAll({
                limit: parseInt(request.limit),
                offset: parseInt(request.offset),
                include: [...constants.PERSONAL_PATIENT_PROFILE, {
                    model: models.HealthProfile,
                    as: 'healthProfiles',
                    include: ['profile', {
                        model: models.Profile,
                        as: 'profile',
                        where: {
                            userId: request.userId,
                        },
                    }]
                },
                ],
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