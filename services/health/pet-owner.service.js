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
            filterFinal = filterProfileNew;
        }

        let filterProfiles = [{
            model: models.PetPatientProfile,
            as: 'petPatientProfiles',
            include: [{
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
        } else {
            const options_ = {
                where: {
                    '$petPatientProfiles.healthProfiles.profile.user_id$': request.userId,
                },
                include: filterProfiles, raw: true
            }

            const myProfiles =
                await models.PetOwner.findAll(options_);
            let ids =
                myProfiles.map(profile => {
                    return profile.id
                });
            options = {
                where: {
                    [Op.or]: operatorOr,
                    [Op.and]: { '$healthProfiles.profile.user_id$': { [Op.ne]: request.userId } },
                    [Op.and]: { '$healthProfiles.pet_patient_Id$': { [Op.notIn]: ids } },
                },
                include: filterProfiles
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
