'use strict';

const { PetProfileSchema, PET_PROFILE_TABLE } = require('./../models/pet-profile.model');
const { ArticleProfileSchema, ARTICLE_PROFILE_TABLE } = require('./../models/article-profile.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PET_PROFILE_TABLE, 'city', PetProfileSchema.city);
    await queryInterface.addColumn(PET_PROFILE_TABLE, 'state', PetProfileSchema.state);
    await queryInterface.addColumn(PET_PROFILE_TABLE, 'zip', PetProfileSchema.zip);
    await queryInterface.addColumn(PET_PROFILE_TABLE, 'address', PetProfileSchema.address);

    await queryInterface.addColumn(ARTICLE_PROFILE_TABLE, 'city', ArticleProfileSchema.city);
    await queryInterface.addColumn(ARTICLE_PROFILE_TABLE, 'state', ArticleProfileSchema.state);
    await queryInterface.addColumn(ARTICLE_PROFILE_TABLE, 'zip', ArticleProfileSchema.zip);
    await queryInterface.addColumn(ARTICLE_PROFILE_TABLE, 'address', ArticleProfileSchema.address);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PET_PROFILE_TABLE, 'city');
    await queryInterface.removeColumn(PET_PROFILE_TABLE, 'state');
    await queryInterface.removeColumn(PET_PROFILE_TABLE, 'zip');
    await queryInterface.removeColumn(PET_PROFILE_TABLE, 'address');

    await queryInterface.removeColumn(ARTICLE_PROFILE_TABLE, 'city');
    await queryInterface.removeColumn(ARTICLE_PROFILE_TABLE, 'state');
    await queryInterface.removeColumn(ARTICLE_PROFILE_TABLE, 'zip');
    await queryInterface.removeColumn(ARTICLE_PROFILE_TABLE, 'address');
  }
};