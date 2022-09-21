const boom = require('@hapi/boom');
const { models, Op } = require('../libs/sequelize');
const constants = require('../shared/constants');

class ProfileService {
    constructor() { }

    async find() {
        const response = await models.Profile.findAll({
            include: [
                { association: 'user' },
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE },
                { association: 'healthProfile', include: constants.HEALTH_PROFILE },
            ]
        });
        return response;
    }

    async findOnlyProfile(body) {
        const profile = await models.Profile.findOne({
            where: {
                [Op.and]: [
                    { qrId: body.qrId }, { pinId: body.pinId }
                ]
            }
        });
        if (!profile) {
            throw boom.notFound('NOT_FOUND');
        }
        return profile;
    }

    async findOne(id) {
        const profile = await models.Profile.findByPk(id, {
            include: [
                { association: 'user' },
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE },
                { association: 'healthProfile', include: constants.HEALTH_PROFILE },
            ]
        });

        if (!profile) {
            throw boom.notFound('Profile not found');
        }
        delete profile.dataValues.user.dataValues.password;
        return profile;
    }

    async findByPinId(body, req) {
        const profile = await models.Profile.findOne({
            include: [
                { association: 'user' },
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE },
                { association: 'healthProfile', include: constants.HEALTH_PROFILE },
            ], where: {
                [Op.and]: [
                    { qrId: body.idProfile }, { pinId: body.pinProfile }
                ]
            }
        });
        if (!profile) {
            throw boom.notFound(req.t('PROFILE_NOT_FOUND'));
        }
        delete profile.dataValues.user.password;
        return profile;
    }

    async findByPinIdRead(body, req) {
        const profile = await models.Profile.findOne({
            include: [
                { association: 'personalProfile', include: constants.PERSONAL_PROFILE },
                { association: 'petProfile', include: constants.PET_PROFILE },
                { association: 'articleProfile', include: constants.ARTICLE_PROFILE },
                { association: 'healthProfile', include: constants.HEALTH_PROFILE },
            ], where: {
                [Op.and]: [
                    { qrId: body.qrId }, { pinId: body.pinId }
                ]
            }
        });
        if (!profile) {
            throw boom.notFound(req.t('PROFILE_NOT_FOUND'));
        }

        delete profile.dataValues.userId;

        // if (profile.dataValues.personalProfile.length > 0){ 
        //     delete profile.dataValues.personalProfile[0].personalProfile.profile;
        // }

        return profile;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        data.qrId = data.qrId.toUpperCase();
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