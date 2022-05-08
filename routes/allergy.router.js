const express = require('express');
const AllergyService = require('../services/allergy.service');
const {
    getAllergySchemaById,
    createAllergySchema,
    updateAllergySchema,
    deleteAllergySchema } = require('../schemas/allergy.schema');
const validationHandler = require('../middlewares/validator.handler');
const utils = require('../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new AllergyService();

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

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    checkRoles('admin', 'customer'),
    validationHandler(getAllergySchemaById),
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
    // validationHandler(createAllergySchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.statusMessage = req.t('CREATED');
            res.status(201).json(await service.create(body));
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/',
    passport.authenticate('jwt', { session: false }),
    // validationHandler(getAllergySchemaById, 'params'),
    // validationHandler(updateAllergySchema, 'body'),
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const id = body['id'];
            res.statusMessage = req.t('UPDATED');
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/',
    passport.authenticate('jwt', { session: false }),
    checkApiKey,
    validationHandler(deleteAllergySchema, 'body'),
    checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            utils.userTokenValidate(body.userId, req.user.sub);

            if (await service.delete(body.id)) {
                res.statusMessage = req.t('DELETED');
                res.status(201).json(true);
            }

        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
