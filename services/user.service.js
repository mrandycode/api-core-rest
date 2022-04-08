const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');
const utils = require('../shared/utils');

class UserService {
    constructor() { }

    async find() {
        const response = await models.User.findAll({
            include: [
                {
                    association: 'profile', include: [
                        { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                        { association: 'petProfile', include: constants.PET_PROFILE },
                        { association: 'articleProfile', include: constants.ARTICLE_PROFILE }
                    ]

                },


            ]
        });
        return response;
    }

    async findOne(id, idToken) {
        const user = await models.User.findByPk(id, {
            include: [
                {
                    association: 'profile', include: [
                        { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                        { association: 'petProfile', include: constants.PET_PROFILE },
                        { association: 'articleProfile', include: constants.ARTICLE_PROFILE }
                    ]

                },
            ]
        });
        if (!user) {
            throw boom.notFound('User not found');
        }
    
        utils.userTokenValidate(id, idToken);

        delete user.dataValues.password;
        return user;
    }
}
module.exports = UserService;