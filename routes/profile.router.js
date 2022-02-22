const express = require('express');
const ProfileService = require('../services/profile.service')
const { getProfileSchema, createProfileSchema, updateProfileSchema } = require('../schemas/profile.schema');
const validationHandler = require('./../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new ProfileService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            res.json(await service.find());
        } catch (error) {
            next(error);
        }
    }
);

router.post('/only',
    // passport.authenticate('jwt', { session: false }),
    // checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        console.log(req.body, 'req in api-rest ONLY');
        const body = req.body;
        try {
            res.json(await service.findOnlyProfile(body));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/pin-id',
    // passport.authenticate('jwt', { session: false }),
    // checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        console.log(req.body, 'req in api-rest');
        const body = req.body;
        try {
            res.json(await service.findByPinId(body));
        } catch (error) {
            next(error);
        }
    }
);



router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            res.json(await service.findOne(id));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProfileSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validationHandler(getProfileSchema, 'params'),
    validationHandler(updateProfileSchema, 'body'),
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
