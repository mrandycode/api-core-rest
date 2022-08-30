const express = require('express');
const PersonalPatientProfileService
    = require('../../services/health/personal-patient-profile.service');
const HealthProfileService
    = require('../../services/health/health-profile.service');
const {
    getPersonalPatientProfileSchemaById,
    getPatientProfileSchemaByForm,
    createPersonalPatientProfileSchema,
    updatePersonalPatientProfileSchema
} = require('../../schemas/health/personal-patient-profile.schema');
const validationHandler = require('../../middlewares/validator.handler');
// const utils = require('../../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../../middlewares/auth.handler');
const passport = require('passport');
const service = new PersonalPatientProfileService();
const healthProfileService = new HealthProfileService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin'),
    async (req, res, next) => {
        try {
            res.json(await service.find());
        } catch (error) {
            next(error);
        }
    }
);

router.post('/get/by/forms',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'doctor'),
    // validationHandler(getPatientProfileSchemaByForm),
    async (req, res, next) => {
        const request = req.body;
        try {
            const rta = await service.findByFormTemplate(request, req);
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/get/limited',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'doctor'),
    // validationHandler(getPatientProfileSchemaByForm),
    async (req, res, next) => {
        const request = req.body;
        const { limit, offset } = req.query;
        request.limit = limit;
        request.offset = offset;
        try {
            const rta = await service.getPatientsLimited(request, req);
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/get/personal-patient',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'doctor'),
    validationHandler(getPersonalPatientProfileSchemaById, 'body'),
    async (req, res, next) => {
        const request = req.body;
        try {
            const rta = await service.findOne(request);
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createPersonalPatientProfileSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'doctor'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.statusMessage = req.t('CREATED_PROFILE');
            const personalPatientProfile = await service.create(body);
            // Se crea de una vez el perfil pivote de salud.
            const { country, id } = personalPatientProfile;
            const { profileId } = body;
            const reqHealth = {
                id: 0,
                country,
                personalPatientProfileId: id,
                profileId,
            };
            await healthProfileService.create(reqHealth)
            res.status(201).json(personalPatientProfile);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(updatePersonalPatientProfileSchema, 'body'),
    checkRoles('admin', 'doctor'),
    async (req, res, next) => {
        try {
            // todo: solucionar el tema para guardar el healt profile. lo más seguro es que haya que agregar nuevo campo
            const body = req.body;
            // const { id, profileId } = body;
            // const personalPatientProfile = await service.update(profileId);
            // const userId = profile.user.id;
            // utils.userTokenValidate(userId, req.user.sub);
            res.statusMessage = req.t('UPDATED');
            const personalPatientProfile = await service.update(body);

            // if (body.isNew) {
            //     const { country, id } = personalPatientProfile;
            //     const { profileId } = body;
            //     const reqHealth = {
            //         id: 0,
            //         country,
            //         personalPatientProfileId: id,
            //         profileId,
            //     };
            //     await healthProfileService.create();
            // }

            res.status(201).json(await addToHealthProfile(body, personalPatientProfile));
        } catch (error) {
            next(error);
        }
    }


);

const addToHealthProfile = async (body, personalPatientProfile) => {
    console.log(body, 'body');
    console.log(personalPatientProfile, 'personalPatientProfile');
    const { country, id } = personalPatientProfile;
    const { profileId, isNew } = body;
    if (isNew) {
        const reqHealth = {
            id: 0,
            country,
            personalPatientProfileId: id,
            profileId,
        };
        await healthProfileService.create(reqHealth);
    }
    return personalPatientProfile;
}

module.exports = router;
