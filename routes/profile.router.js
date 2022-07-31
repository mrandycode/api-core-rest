const express = require('express');
const boom = require('@hapi/boom');
const ProfileService = require('../services/profile.service')
const { getProfileSchema, createProfileSchema, updateProfileSchema } = require('../schemas/profile.schema');
const validationHandler = require('./../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const utils = require('../shared/utils');
const passport = require('passport');
const service = new ProfileService();

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

router.post('/only',
    // passport.authenticate('jwt', { session: false }),
    checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        const body = req.body;
        try {
            const profile = await service.findOnlyProfile(body);
            if (profile) {
                const id = profile.dataValues.id;
                const response = await service.findOne(id);
                delete response.dataValues.user;
                delete response.dataValues.userId;
                res.json(response);
            }
        } catch (error) {
            next(error);
        }
    }
);

router.post('/pin-id',
    // passport.authenticate('jwt', { session: false }),
    checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        const body = req.body;
        try {
            res.json(await service.findByPinId(body, req));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/pin-id-read',
    checkApiKey,
    async (req, res, next) => {
        const body = req.body;
        try {
            res.json(await service.findByPinIdRead(body, req));

        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor'),
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const rta = await service.findOne(id);
            utils.userTokenValidate(rta.user.id, req.user.sub);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/id-read/:id',
    checkApiKey,
    async (req, res, next) => {
        const { id } = req.params;
        try {
            const rta = await service.findOne(id);
            delete rta.dataValues.user;
            delete rta.dataValues.userId;
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProfileSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor'),
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
    passport.authenticate('jwt', { session: false }),
    validationHandler(getProfileSchema, 'params'),
    validationHandler(updateProfileSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            utils.userTokenValidate(body.userId, req.user.sub);
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler(getProfileSchema, 'params'),
    validationHandler(updateProfileSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            // utils.userTokenValidate(body.userId, req.user.sub);
            res.status(201).json(await service.delete(id));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
