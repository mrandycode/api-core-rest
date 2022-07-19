'use strict';

const { PetProfileSchema, PET_PROFILE_TABLE } = require('./../models/pet-profile.model');


module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(PET_PROFILE_TABLE, 'license', PetProfileSchema.license);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PET_PROFILE_TABLE, 'license', PetProfileSchema);
  }
};
