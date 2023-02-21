const boom = require('@hapi/boom')
const { models } = require('../../libs/sequelize')
// const constants = require('../shared/constants');

class PersonalMedicalHistoryService {
    constructor() {}

    async find() {
        const personalMedicalStories =
            await models.PersonalMedicalHistory.findAll()
        return personalMedicalStories
    }

    async findOne(id) {
        const personalMedicalHistory =
            await models.PersonalMedicalHistory.findByPk(id)
        if (!personalMedicalHistory) {
            throw boom.notFound('Profile not found')
        }
        return personalMedicalHistory
    }

    async findByPatient(id) {
        const personalMedicalHistory =
            await models.PersonalMedicalHistory.findAll({
                where: { personalPatientProfileId: id },
                order: [['appointmentDate', 'DESC']],
            })
        if (!personalMedicalHistory) {
            throw boom.notFound('Profile not found')
        }
        return personalMedicalHistory
    }

    async create(request) {
        let response
        const newPersonalMedicalHistory =
            await models.PersonalMedicalHistory.create(request)
        if (newPersonalMedicalHistory) {
            response = await this.findOne(newPersonalMedicalHistory.id)
        }
        return response
    }

    async update(id, request) {
        const personalMedicalHistory = await this.findOne(id)
        if (personalMedicalHistory) {
            const response = await models.PersonalMedicalHistory.update(
                request,
                { where: { id: request.id } }
            )
            return response
        } else {
            return [0]
        }
    }

    async delete(id) {
        const personalMedicalHistory = await this.findOne(id)
        if (!personalMedicalHistory) {
            throw boom.notFound('Profile not found')
        }
        await personalMedicalHistory.destroy()
        return true
    }
}
module.exports = PersonalMedicalHistoryService
