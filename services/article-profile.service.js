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
        let response;
        const newArticleProfile = await models.ArticleProfile.create(data);
        if (newArticleProfile) {
            response = await this.findOne(newPersonalProfile.id);
        }
        return response;
    }

    async update(id, request) {
        const articleProfile = await this.findOne(id);
        if (articleProfile) {
            const response = await models.ArticleProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0];
        }
    }

    async delete(id) {
        const petProfile = await this.findOne(id);
        await petProfile.destroy();
        return { response: true };
    }
}
module.exports = ArticleProfileService;