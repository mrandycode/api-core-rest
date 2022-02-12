const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');

class ProfileService {
    constructor() { }

    async find() {
        const response = await models.Profile.findAll({
            include: [
                { association: 'user' },
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE }
            ]
        });
        return response;
    }

    async findOne(id) {
        const profile = await models.Profile.findByPk(id, {
            include: [
                { association: 'user' },
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE }
            ]
        });
        if (!profile) {
            throw boom.notFound('Profile not found');
        }
        return profile;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newProfile = await models.Profile.create(data);
        return newProfile;
        // }
    }

    async update(id, changes) {
        const model = await this.findOne(id);
        const rta = await model.update(changes);
        return rta;
    }

    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { rta: true };
    }
}
module.exports = ProfileService;