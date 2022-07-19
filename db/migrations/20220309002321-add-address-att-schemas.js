'use strict';


const { PersonalProfileSchema, PERSONAL_PROFILE_TABLE } = require('./../models/personal-profile.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PERSONAL_PROFILE_TABLE, 'city', PersonalProfileSchema.city);
    await queryInterface.addColumn(PERSONAL_PROFILE_TABLE, 'state', PersonalProfileSchema.state);
    await queryInterface.addColumn(PERSONAL_PROFILE_TABLE, 'zip', PersonalProfileSchema.zip);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PERSONAL_PROFILE_TABLE, 'city');
    await queryInterface.removeColumn(PERSONAL_PROFILE_TABLE, 'state');
    await queryInterface.removeColumn(PERSONAL_PROFILE_TABLE, 'zip');
  }
};
