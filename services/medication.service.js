const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class MedicationService {
    constructor() { }

    async find() {
        const response = await models.Medication.findAll({
            // include: ['personalProfile']
        });
        return response;
    }

    async findOne(id) {
        const medication = await models.Medication.findByPk(id, {
            // include: ['personalProfile']
        });
        if (!medication) {
            throw boom.notFound('medication not found');
        }
        return medication;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newPreexistingDiseases = await models.Medication.create(data);
        return newPreexistingDiseases;
        // }
    }

    async update(id, changes) {
        const medication = await this.findOne(id);
        const response = await medication.update(changes);
        return response;
    }

    async delete(id) {
        const medication = await this.findOne(id);
        await medication.destroy();
        return { response: true };
    }
}
module.exports = MedicationService;