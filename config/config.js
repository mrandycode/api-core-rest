require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    jwtSecret: process.env.JWT_SECRET,
    jwtGeoSecret: process.env.JWT_GEO_SECRET,
    apiKey: process.env.API_KEY,
    corsWhiteList: process.env.CORS_WHITE_LIST.split(' '),
    hostEmail: process.env.HOST_EMAIL,
    portEmail: process.env.PORT_EMAIL,
    baseUrlWeb: process.env.BASE_URL_WEB,
    geolocationExpire: process.env.GEOLOCATION_EXPIRE,
};

module.exports = { config };