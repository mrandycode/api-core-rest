const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');

class ArticleProfileService {
    constructor() { }

    async find() {
        const articleProfiles = await models.ArticleProfile.findAll({
            include: [...constants.ARTICLE_PROFILE]

        });
        return articleProfiles;
    }

    async findOne(id) {
        const articleProfile = await models.ArticleProfile.findByPk(id, {
            include: [...constants.ARTICLE_PROFILE]
        });
        if (!articleProfile) {
            throw boom.notFound('articleProfile not found');
        }
        return articleProfile;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newArticleProfile = await models.ArticleProfile.create(data);
        return newArticleProfile;
        // }
    }

    async update(id, changes) {
        const articleProfile = await this.findOne(id);
        const response = await articleProfile.update(changes);
        return response;
    }

    async delete(id) {
        const petProfile = await this.findOne(id);
        await petProfile.destroy();
        return { response: true };
    }
}
module.exports = ArticleProfileService;