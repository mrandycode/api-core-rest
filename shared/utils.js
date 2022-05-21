const constants = require('../shared/constants');
const boom = require('@hapi/boom');
const { config } = require('../config/config');

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

function getEmailScanMe(user, token, scanme, req) {
    const host = config.baseUrlWeb;
    let geolocation = '';
    let link = ''
    if (token !== '-1') {
        link = host + `/show/map/${token}`;
        geolocation = '<a href=\"' + link + '\" target=\"_blank\">Link</a>';
    } else {
        geolocation = 'Quien escaneo no compartió la ubicación.';
    }

    const body = {
        from: constants.EMAILS.SUPPORT,
        to: user.email,
        subject: req.t('SCAN_ME'),
        text: 'Dar Click a el siguiente link para recuperar su contraseña ' + geolocation,
        html: '<div style=\"display:flex; justify-content:center\"><img width=\"300px\" height=\"100px\" src=\"https://www.salvameid.com/assets/images/logo-banner.png\"></div><h1>Se ha escaneado uno de tus perfiles</h1> <p>Hola, ' + user.name + ', nuestro sistema ha detectado un escaneo de uno de tus perfiles.</p> <p>Nombre del perfil: ' + scanme.nameProfile + '<p> <p>Hora: ' + scanme.dateTimeOn + '</p> <p>Dispositivo identificado cómo: ' + scanme.hostname + '</p><p>Fue escaneado desde la IP: ' + scanme.ip + '</p> <p>Link para la ubicación: ' + geolocation + ' </p> <p>Muchas gracias por preferirnos!</p> </body> </html>'
    }

    return setBodyEmail(body);
}

function setBodyEmail(body) {
    const bodyEmail = {
        from: body.from,
        to: body.to,
        subject: body.subject,
        text: body.text,
        html: body.html
    }
    return bodyEmail;
}

function getDateTime() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    let [hour, minutes] = [date.getHours(), date.getMinutes()];

    hour = hour < 10 ? '0' + hour.toString() : hour;
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes;

    const dateTimeOn = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes
    return dateTimeOn;
}

async function getNameProfile(profile) {
    let nameProfile = '';

    if (profile.profileType === 1) {
        nameProfile = profile.personalProfile[0].name;
    } else if (profile.profileType === 2) {
        nameProfile = profile.petProfile[0].name;
    } else {
        nameProfile = profile.articleProfile[0].name;
    }

    return nameProfile;
}

module.exports = {
    getErrorByPathOrm,
    translateBoom,
    userTokenValidate,
    getEmailScanMe,
    getDateTime,
    getNameProfile
}