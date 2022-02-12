const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const constants = require('../shared/constants');

class EmergencyContactService {
    constructor() { }

    async find() {
        const response = await models.EmergencyContact.findAll({
            include: [...constants.EMERGENCY_CONTACTS]
        });
        return response;
    }

    async findOne(id) {
        const emergencyContact = await models.EmergencyContact.findByPk(id, {
            include: [...constants.EMERGENCY_CONTACTS]
        });
        if (!emergencyContact) {
            throw boom.notFound('emergencyContact Contacts not found');
        }
        return emergencyContact;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newEmergencyContact = await models.EmergencyContact.create(data);
        return newEmergencyContact;
        // }
    }

    async update(id, changes) {
        const emergencyContact = await this.findOne(id);
        const response = await emergencyContact.update(changes);
        return response;
    }

    async delete(id) {
        const emergencyContact = await this.findOne(id);
        await emergencyContact.destroy();
        return { response: true };
    }
}
module.exports = EmergencyContactService;