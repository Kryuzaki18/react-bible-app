'use strict';

const verses = require('../data/verses.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('verses', verses.get, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('verses', null, {});
  }
};
