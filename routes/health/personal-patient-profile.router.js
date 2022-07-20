const express = require('express');
const PersonalPatientProfileService
    = require('../../services/health/personal-patient-profile.service');
const {
   getPersonalPatientProfileSchemaById,
   createPersonalPatientProfileSchema,
   updatePersonalPatientProfileSchema
} = require('../../schemas/health/personal-patient-profile.schema');
const validationHandler = require('../../middlewares/validator.handler');
// const utils = require('../../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../../middlewares/auth.handler');
const passport = require('passport');
const service = new PersonalPatientProfileService();
// const profileService = new ProfileService();

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

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'doctor'),
    validationHandler(getPersonalPatientProfileSchemaById),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const rta = await service.findOne(id);
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
            res.status(201).json(await service.create(body));
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
            const body = req.body;
            const { id, profileId } = body;
            // const profile = await profileService.findOne(profileId);
            // const userId = profile.user.id;
            // utils.userTokenValidate(userId, req.user.sub);
            res.statusMessage = req.t('UPDATED');
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
