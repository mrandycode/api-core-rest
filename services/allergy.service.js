const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class AllergyService {
    constructor() { }

    async find() {
        const response = await models.Allergy.findAll({
            include: ['profile']
        });
        return response;
    }

    async findOne(id) {
        const Allergy = await models.Allergy.findByPk(id, {
            include: ['profile']
        });
        if (!Allergy) {
            throw boom.notFound('Allergy not found');
        }
        return Allergy;
    }

    async create(data) {

        // const profile = await this.findOne(data.id);
        // if (!profile) {
        const newAllergy = await models.Allergy.create(data);
        return newAllergy;
        // }
    }

    async update(id, changes) {
        const allergy = await this.findOne(id);
        const response = await allergy.update(changes);
        return response;
    }

    async delete(id) {
        const allergy = await this.findOne(id);
        await allergy.destroy();
        return { response: true };
    }
}
module.exports = AllergyService;