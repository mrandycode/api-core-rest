const constants = require('../shared/constants');

// Para usar estos métodos es importante que se mapeen los
// tags en los archivos translation.json

function getErrorByPathOrm(errors, req) {
    errors.map(error => {
        const message = constants.ORM_VALIDATION.find((res) =>
            res.path === error.path
            && res.validatorKey === error.validatorKey);
            console.log(req.t(message.translateKey, 'message.translateKey'))
        return error.message = req.t('PIN_ID_UNIQUE');
    });
    return errors;
}

function translateBoom(err, req) {
    err.output.payload.message = req.t(err.output.payload.message);
    return err;
}

module.exports = { getErrorByPathOrm, translateBoom }