const { config } = require('../config/config');

module.exports = Object.freeze({
    PERSONAL_PROFILE: [
        'emergencyContacts',
        'preexistingDiseases',
        'allergies',
        'medications',
        'profile'
    ],
    PET_PROFILE: [
        'emergencyContacts',
        'preexistingDiseases',
        'allergies',
        'medications',
        'profile'],
    ARTICLE_PROFILE: ['emergencyContacts', 'profile'],
    EMERGENCY_CONTACTS: [
        'personalProfile',
        'petProfile',
        'articleProfile'],
    ORM_VALIDATION: [
        {
            path: 'profile_idx_02',
            validatorKey: 'not_unique',
            translateKey: 'PIN_ID_UNIQUE'
        },
        {
            path: 'email',
            validatorKey: 'not_unique',
            translateKey: 'EMAIL_UNIQUE'
        }

    ],
    EMAIL_SCANME: {
        host: config.hostEmail,
        port: config.portEmail,
        path: '/api-send-mail-rest/support',
        method: 'POST',
        headers: {
            'api-key': config.apiKey,
            'Content-Type': 'application/json'
        }
    },
    EMAILS: {
        RECOVERY: "recovery@salvameid.com",
        SUPPORT: "support@salvameid.com"
    }
},
);