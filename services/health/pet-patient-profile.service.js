const boom = require('@hapi/boom');
const { models, Op } = require('../../libs/sequelize');
const { PetMedicalHistory } = require('../../db/models/health/pet-medical-history.model')
const constants = require('../../shared/constants');

class PetPatientProfileService {
    constructor() { }

    async find() {
        const petPatientProfiles =
            await models.PetPatientProfile.findAll();
        return petPatientProfiles;
    }

    async findOne(request) {
        const petPatientProfile =
            await models.PetPatientProfile.findByPk(request.id, {
                include: [...constants.PET_PATIENT_PROFILE,
                {
                    model: models.PetMedicalHistory,
                    as: 'petMedicalStories',
                    required: false,
                    where: {
                        [Op.or]: [
                            { id: request.id },
                            { userId: request.userId }
                        ]
                    }
                }
                ],
                order: [
                    [{
                        model: PetMedicalHistory,
                        as: 'petMedicalStories',
                        required: false
                    },
                        'appointmentDate', 'desc'],
                ],
            });
        if (!petPatientProfile) {
            throw boom.notFound('Profilesss not found');
        }
        return petPatientProfile;
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
            { lastName: { [Op.like]: `%${request.lastName || null}%` } },
        ];

        if (!request.isNew) {
            filterFinal = filterProfileNotNew;
        } else {
            filterFinal = filterProfileNew;
        }

        let filterProfiles = [...constants.PET_PATIENT_PROFILE, {
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
            const options_ = {
                where: {
                    '$healthProfiles.profile.user_id$': request.userId ,
                },
                include: [...constants.PET_PATIENT_PROFILE, {
                    model: models.HealthProfile,
                    as: 'healthProfiles',
                    include: ['profile', {
                        model: models.Profile,
                        as: 'profile',
                        where: filterProfileNotNew,
                    }
                    ]
                }], raw: true
            }
            const myProfiles =
            await models.PersonalPatientProfile.findAll(options_);
            let ids =
            myProfiles.map(profile =>{
                return profile.id
            });
            options = {
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$healthProfiles.profile.user_id$': { [Op.ne]: request.userId } },
                    [Op.and]: { '$healthProfiles.personal_patient_Id$': { [Op.notIn]: ids } },
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
                include: [...constants.PET_PATIENT_PROFILE, {
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
        const newPetPatientProfile =
            await models.PetPatientProfile.create(request);
        
        if (newPetPatientProfile) {
            request = { ...request, id: newPetPatientProfile.id }
            response = await this.findOne(request);
        }
        return response;
    }

    async update(request) {
        const petPatientProfile = await this.findOne(request);
        if (petPatientProfile) {
            await models.PetPatientProfile.update(request,
                { where: { id: request.id } });
            return await this.findOne(request);
        } else {
            return [0]
        }
    }

    async delete(id) {
        const petPatientProfile = await this.findOne(id);
        await petPatientProfile.destroy();
        return { response: true };
    }
}
module.exports = PetPatientProfileService;