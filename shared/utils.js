const constants = require('../shared/constants');
const boom = require('@hapi/boom');

// Para usar estos métodos es importante que se mapeen los
// tags en los archivos translation.json

function getErrorByPathOrm(errors, req) {
    errors.map(error => {
        const message = constants.ORM_VALIDATION.find((res) =>
            res.path === error.path
            && res.validatorKey === error.validatorKey);
        return error.message = req.t(message.translateKe);
    });
    return errors;
}

function translateBoom(err, req) {
    err.output.payload.message = req.t(err.output.payload.message.toUpperCase());
    return err;
}

function userTokenValidate(userId, idToken) {
    if (userId != idToken) {
        throw boom.unauthorized('UNAUTHORIZED');
    }
}


module.exports = { getErrorByPathOrm, translateBoom, userTokenValidate }