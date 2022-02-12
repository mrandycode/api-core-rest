const express = require('express');
const PreexistingDiseasesService = require('../services/preexisting-diseases.service');
const {
    getPreexistingDiseaseSchemaById,
    createPreexistingDiseaseSchema,
    updatePreexistingDiseaseSchema } = require('../schemas/preexisting-disease.schema');
const validationHandler = require('../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new PreexistingDiseasesService();

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
    validationHandler(createPreexistingDiseaseSchema, 'body'),
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
    validationHandler(getPreexistingDiseaseSchemaById, 'params'),
    validationHandler(updatePreexistingDiseaseSchema, 'body'),
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
