'use strict';

const books = require("../data/books.json");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', books.get, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {});
  }
};
