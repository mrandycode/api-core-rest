'use strict';

const { PersonalProfileSchema, PERSONAL_PROFILE_TABLE } = require('./../models/personal-profile.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(PERSONAL_PROFILE_TABLE, 'eye_color', PersonalProfileSchema.eyeColor);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(PERSONAL_PROFILE_TABLE, 'eye_color', PersonalProfileSchema);
  }
};
