const express = require('express');
const PetOwnerService
    = require('../../services/health/pet-owner.service');
const HealthProfileService
    = require('../../services/health/health-profile.service');
const {
    getOwnerSchemaById,
    getOwnerSchemaByForm,
    getOwnerSchemaByDni,
    createOwnerSchema,
    updateOwnerSchema
} = require('../../schemas/health/pet-owner.schema');
const validationHandler = require('../../middlewares/validator.handler');
const utils = require('../../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../../middlewares/auth.handler');
const passport = require('passport');
const service = new PetOwnerService();
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
    checkRoles('admin', 'veterinary'),
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
    checkRoles('admin', 'veterinary'),
    validationHandler(getOwnerSchemaByDni),
    async (req, res, next) => {
        const request = req.body;
        // const { limit, offset } = req.query;
        // request.limit = limit;
        // request.offset = offset;
        try {
            const rta = await service.getPatientsLimited(request, req);
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'veterinary'),
    validationHandler(getOwnerSchemaById),
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

router.post('/get/by/dni',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'veterinary'),
    validationHandler(getOwnerSchemaByDni),
    async (req, res, next) => {
        const request = req.body;
        try {
            const rta = await service.getPetPatientProfilesByOwnerDni(request, req);
        
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/get/pet-patient',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'veterinary'),
    // validationHandler(getPetPatientProfileSchemaById, 'body'),
    async (req, res, next) => {
        const request = req.body;
        try {
            const petPatientProfile = await service.findOne(request);
            // utils.userTokenValidate(rta.profile.userId, req.user.sub);
            res.json(petPatientProfile);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createOwnerSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'veterinary'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.statusMessage = req.t('CREATED_PROFILE');
            const petOwner = await service.create(body);
            res.status(201).json(petOwner);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    validationHandler(updateOwnerSchema, 'body'),
    checkRoles('admin', 'veterinary'),
    async (req, res, next) => {
        try {
            const { body } = req;
            res.statusMessage = req.t('UPDATED');
            const petPatientProfile = await service.update(body);
            res.status(201).json(await addToHealthProfile(body, petPatientProfile));
        } catch (error) {
            next(error);
        }
    }


);

const addToHealthProfile = async (body, petPatientProfile) => {
    const { country, id } = petPatientProfile;
    const { profileId, isNew } = body;
    if (isNew) {
        const reqHealth = {
            id: 0,
            country,
            petPatientProfileId: id,
            profileId,
        };
        await healthProfileService.create(reqHealth);
    }
    return petPatientProfile;
}

module.exports = router;
