const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const constants = require('../shared/constants');

class DoctorProfileService {
    constructor() { }

    async find() {
        const doctorProfiles = await models.DoctorProfile.findAll({
            // include: [...constants.PERSONAL_PROFILE]

        });
        return doctorProfiles;
    }

    async findOne(id) {
        const doctorProfile = await models.DoctorProfile.findByPk(id, {
            // include: [...constants.PERSONAL_PROFILE]
        });
        if (!doctorProfile) {
            throw boom.notFound('Profile not found');
        }
        return doctorProfile;
    }

    async create(request) {
        let response;
        const newDoctorProfile = await models.DoctorProfile.create(request);
        if (newDoctorProfile) {
            response = await this.findOne(newDoctorProfile.id);
        }
        return response;
    }

    async update(id, request) {
        const doctorProfile = await this.findOne(id);
        if (doctorProfile) {
            const response = await models.DoctorProfile.update(request,
                { where: { id: request.id } });
            return response;
        } else {
            return [0]
        }
    }

    async delete(id) {
        const doctorProfile = await this.findOne(id);
        await doctorProfile.destroy();
        return { response: true };
    }
}
module.exports = DoctorProfileService;