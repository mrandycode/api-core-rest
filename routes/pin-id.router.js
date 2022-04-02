const express = require('express');
const PinIdService = require('../services/pin-id.service');
const {
    getPinIdSchemaByCountry,
    generatePinIdSchema,
    getPinIdSchema, 
    updatePinIdSchema} = require('../schemas/pin-id.schema');
const validationHandler = require('../middlewares/validator.handler');
const router = express.Router();
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new PinIdService();
const QRCode = require('qrcode');

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

router.get('/generate-qr/:country/:limit',
    validationHandler(getPinIdSchemaByCountry),
    async (req, res, next) => {
        const { country, limit } = req.params;
        try {
            const response = await service.findByCountry(country, parseInt(limit, 10));

            QRCode.toString('I am a pony!', { type: 'terminal' }, function (err, url) {
                console.log(url)
            });

            res.json(await service.findByCountry(country, parseInt(limit, 10)));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validationHandler(getPinIdSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        const id = body['idProfile'];
        const pin = body['pinProfile'];
        try {   
            res.json(await service.findByPinId(id, pin));
        } catch (error) {
            next(error);
        }
    }
)

router.patch('/',
    validationHandler(updatePinIdSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        // const id = body['idProfile'];
        // const pin = body['pinProfile'];
        try {
            // const response = await service.findByPinId(id, pin);      
            res.json(await service.update(body));
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;
