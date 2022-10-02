const express = require('express');
const MedicationService = require('../services/medication.service');
const {
    getMedicationSchemaById,
    createMedicationSchema,
    updateMedicationSchema,
    deleteMedicationSchema } = require('../schemas/medication.schema');
const validationHandler = require('../middlewares/validator.handler');
const utils = require('../shared/utils');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new MedicationService();

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
    checkRoles('admin', 'customer', 'doctor', 'veterinary'),
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
    passport.authenticate('jwt', { session: false }),
    // validationHandler(createMedicationSchema, 'body'),
    checkApiKey,
    checkRoles('admin', 'customer', 'doctor', 'veterinary'),
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
    // validationHandler(getMedicationSchemaById, 'params'),
    // validationHandler(updateMedicationSchema, 'body'),
    checkRoles('admin', 'customer', 'doctor', 'veterinary'),
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
    validationHandler(deleteMedicationSchema, 'body'),
    checkRoles('admin', 'customer', 'doctor', 'veterinary'),
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
