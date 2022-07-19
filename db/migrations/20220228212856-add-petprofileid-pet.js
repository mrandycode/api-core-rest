'use strict';

const { PreexistingDiseasesSchema, PREEXISTING_DISEASES_TABLE } = require('./../models/preexisting-disease.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PREEXISTING_DISEASES_TABLE, 'pet_profile_id', PreexistingDiseasesSchema.petProfileId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PREEXISTING_DISEASES_TABLE, 'pet_profile_id', PreexistingDiseasesSchema);
  }
};
