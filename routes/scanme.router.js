const express = require('express');
const router = express.Router();
const http = require('https');
const constants = require('../shared/constants');
const validatorHandler = require('../middlewares/validator.handler');
const ProfileService = require('../services/profile.service');
const { getScanMeSchema } = require('../schemas/scanme.schema');
const profileService = new ProfileService();
const { checkApiKey } = require('../middlewares/auth.handler');
const utils = require('../shared/utils');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const os = require("os");

router.post('/send',
    validatorHandler(getScanMeSchema, 'body'),
    checkApiKey,
    async (req, res, next) => {
        try {

            const geolocationExpire = config.geolocationExpire;
            const dateTimeOn = utils.getDateTime();
            const scanme = req.body;
            const profile = await profileService.findOne(scanme.id);
            const nameProfile = await utils.getNameProfile(profile);
          
            const user = profile.user;
            user.emergencyContacts = await utils.getAllEmergencyEmails(profile);
            let token = '-1';

            const ipClient = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
            const hostname = req.headers.host;            

            if (scanme.lng && scanme.lat) {
                const payload = {
                    lng: scanme.lng,
                    lat: scanme.lat
                };
                token = jwt.sign(payload, config.jwtGeoSecret, { expiresIn: geolocationExpire });
            }

            scanme.ip = ipClient;

            scanme.dateTimeOn = dateTimeOn;
            scanme.nameProfile = nameProfile;
            scanme.hostname = hostname;
            console.log(os.hostname(), 'hostname')

            const bodyEmail = utils.getEmailScanMe(user, token, scanme, req);
            const options = constants.EMAIL_SCANME;
            var postReq = await http.request(options, function (response) {
                response.setEncoding('utf8');
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    res.end(data);
                });

            });
            postReq.write(JSON.stringify(bodyEmail));
            postReq.end();

        } catch (error) {
            next(error);
        }
    });

router.get('/verify/geolocation/:token',
    checkApiKey,
    async (req, res) => {
        try {
            const { token } = req.params;
            payload = jwt.verify(token, config.jwtGeoSecret);

            if (payload) {
                const geolocation = { lng: payload.lng, lat: payload.lat }
                return res.status(200).json(geolocation);
            }

        } catch (error) {
            if (error) {
                return res.status(401).json({
                    statusCode: 401,
                    message: req.t('TOKEN_EXPIRED')
                });
            }
        }
    });

module.exports = router;
