const express = require('express');
const MedicationService = require('../services/medication.service');
const {
    getMedicationSchemaById,
    createMedicationSchema,
    updateMedicationSchema } = require('../schemas/medication.schema');
const validationHandler = require('../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new MedicationService();

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
    validationHandler(getMedicationSchemaById),
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
    // passport.authenticate('jwt', { session: false }),
    // validationHandler(createMedicationSchema, 'body'),
    // checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.create(body));
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/',
    // validationHandler(getMedicationSchemaById, 'params'),
    // validationHandler(updateMedicationSchema, 'body'),
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const id = body['id'];
            res.status(201).json(await service.update(id, body));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
