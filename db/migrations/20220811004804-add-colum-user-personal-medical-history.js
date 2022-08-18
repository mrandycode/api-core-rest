'use strict';

const { PersonalMedicalHistorySchema, PERSON_MEDICAL_STORIES_TABLE } = require('./../models/health/personal-medical-history.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(PERSON_MEDICAL_STORIES_TABLE, 'user_id', PersonalMedicalHistorySchema.userId);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(PERSON_MEDICAL_STORIES_TABLE, 'user_id', PersonalMedicalHistorySchema);
  }
};
