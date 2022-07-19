'use strict';

const { MedicationSchema, MEDICATIONS_TABLE } = require('./../models/medication.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(MEDICATIONS_TABLE, 'pet_profile_id', MedicationSchema.petProfileId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(MEDICATIONS_TABLE, 'pet_profile_id', MedicationSchema);
  }
};
