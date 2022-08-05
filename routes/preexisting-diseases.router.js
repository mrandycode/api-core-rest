const express = require('express');
const PreexistingDiseasesService = require('../services/preexisting-diseases.service');
const {
    getPreexistingDiseaseSchemaById,
    createPreexistingDiseaseSchema,
    updatePreexistingDiseaseSchema,
    deletePreexistingDiseaseSchema } = require('../schemas/preexisting-disease.schema');
const validationHandler = require('../middlewares/validator.handler');
const utils = require('../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new PreexistingDiseasesService();

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
    checkRoles('admin', 'customer', 'doctor'),
    validationHandler(getPreexistingDiseaseSchemaById),
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
    // validationHandler(createPreexistingDiseaseSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor'),
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
    // validationHandler(getPreexistingDiseaseSchemaById, 'params'),
    // validationHandler(updatePreexistingDiseaseSchema, 'body'),
    checkRoles('admin', 'customer', 'dotocr'),
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
    validationHandler(deletePreexistingDiseaseSchema, 'body'),
    checkRoles('admin', 'customer', 'doctor'),
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
