const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');
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

    async findOne(id) {
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
    
        delete user.dataValues.password;
        return user;
    }
}
module.exports = UserService;