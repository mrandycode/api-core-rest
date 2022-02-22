const express = require('express');
const PinIdService = require('../services/pin-id.service');
const {
    getPinIdSchemaByCountry,
    generatePinIdSchema } = require('../schemas/pin-id.schema');
const validationHandler = require('../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new PinIdService();


router.get('/:country/:limit',
    // passport.authenticate('jwt', { session: false }),
    // checkApiKey,
    // checkRoles('admin'),
    validationHandler(getPinIdSchemaByCountry),
    async (req, res, next) => {
        const { country, limit } = req.params;
        try {
            res.json(await service.findByCountry(country, parseInt(limit, 10)));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/start',
    // passport.authenticate('jwt', { session: false }),
    validationHandler(generatePinIdSchema, 'body'),
    checkApiKey,
    // checkRoles('admin'),
    async (req, res, next) => {
        try {
            const body = req.body;
            res.status(201).json(await service.generate(body));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
