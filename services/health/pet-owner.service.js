const boom = require('@hapi/boom');
const { models, Op } = require('../../libs/sequelize');
const constants = require('../../shared/constants');

class PetOwnerService {


    async create(request) {
        let response;
        const newPetOwner =
            await models.PetOwner.create(request);
        if (newPetOwner) {
            // request = { ...request, id: newPetOwner.id }
            // response = await this.findOne(request);
            response = newPetOwner;
        }
        return response;
    }


    async update(body) {
        const { id } = body
        const petOwner = await this.findOne(id);
        if (petOwner) {
            const response = await models.PetOwner.update(body,
                { where: { id: id } });
            return response;
        } else {
            return [0]
        }
    }

    async findOne(id) {
        const petOwner = await models.PetOwner.findByPk(id, {
            // include: ['profile']
        });
        if (!petOwner) {
            throw boom.notFound('NOT_FOUND');
        }
        return petOwner;
    }

    // async getPetPatientProfilesByOwnerDni(request, req) {
    //     // aquí va la magia de agrupamiento dependiendo del veterinario
    //     const petPatientProfilesByOwner =
    //         await models.PetOwner.findOne({
    //             where: { dni: request.dni },
    //             include: [...constants.PET_OWNER
    //             ],
    //         });

    //     if (petPatientProfilesByOwner.length < 1) {
    //         throw boom.notFound(req.t('NOT_FOUND'));
    //     }
    //     return petPatientProfilesByOwner;
    // }


    async getPetPatientProfilesByOwnerDni(request, req) {

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
            { email: request.email || null }
        ];

        if (!request.isNew) {
            filterFinal = filterProfileNotNew;
        } else {
            filterFinal = filterProfileNotNew;
        }

        let filterProfiles = [{
            model: models.PetPatientProfile,
            as: 'petPatientProfiles',
            include: [...constants.PET_PATIENT_PROFILE, {
                model: models.HealthProfile,
                as: 'healthProfiles',
                include: ['profile', {
                    model: models.Profile,
                    as: 'profile',
                    where: filterFinal,
                }]
            }]
        }];

        if (!request.isNew) {
            options = {
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId },
                },
                include: filterProfiles
            }

            const options_ = {
                // where: {
                //     '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId,
                // },
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId },
                },
                include: filterProfiles,
                raw: true
            }

            const myProfiles =
                await models.PetOwner.findAll(options_);

            let ids =
                myProfiles.map(profile => {
                    return profile['petPatientProfiles.id']

                });
            options = {
                where: {
                    [Op.or]: [{ dni: request.dni || null }],
                    // [Op.or]: [{ email: request.email || null }],
                    // [Op.and]: { '$healthProfiles.profile.user_id$': request.userId },
                    //  [Op.and]: { '$petPatientProfiles.healthProfiles.pet_patient_Id$': { [Op.notIn]: ids } },
                },
                include: [{
                    model: models.PetPatientProfile,
                    as: 'petPatientProfiles',
                    include: [{
                        model: models.HealthProfile,
                        as: 'healthProfiles',
                        where: {
                            [Op.and]: { '$petPatientProfiles.healthProfiles.pet_patient_Id$': { [Op.in]: ids } }
                        }
                    }]
                }]
            }
        } else {
            const options_ = {
                // where: {
                //     '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId,
                // },
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId },
                },
                include: filterProfiles,
                raw: true
            }

            const myProfiles =
                await models.PetOwner.findAll(options_);

            let ids =
                myProfiles.map(profile => {
                    return profile['petPatientProfiles.id']

                });

            /** *
             * Premisas: Query dinámico 
             * 1- Query dinamico para seleccionar solo perfiles que no tenga 
             *    un veterinario asociado cuando es un PIN-ID nuevo  
             * 2- Query dinamico para seleccionar solo perfiles de veteriniarios cuando no es nuevo 
             * **/

            let include = [];
            if (ids && ids.length > 0) {
                include = [{
                    model: models.PetPatientProfile,
                    as: 'petPatientProfiles',
                    include: [{
                        model: models.HealthProfile,
                        as: 'healthProfiles',
                        where: {
                            [Op.and]: { '$petPatientProfiles.healthProfiles.pet_patient_Id$': { [Op.notIn]: ids } }
                        }
                    }]
                }]
            }

            options = {
                where: {
                    [Op.or]: [{ dni: request.dni || null }],
                    // [Op.or]: [{ email: request.email || null }],
                    // [Op.and]: { '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId },
                    //  [Op.and]: { '$petPatientProfiles.healthProfiles.pet_patient_Id$': { [Op.notIn]: ids } },
                },
                include
            }
        }

        const petPatientProfiles =
            await models.PetOwner.findAll(options);

        if (petPatientProfiles.length < 1) {
            throw boom.notFound(req.t('NOT_FOUND'));
        }

        return petPatientProfiles;
    }
}


module.exports = PetOwnerService;
