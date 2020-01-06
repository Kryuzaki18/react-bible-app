"use strict";
module.exports = (sequelize, DataTypes) => {
  const verses = sequelize.define(
    "verses",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookId: {
        type: DataTypes.INTEGER(11),
        required: true,
        allowNull: false,
        min: 1,
        max: 2
      },
      chapter: {
        type: DataTypes.INTEGER(3),
        required: true,
        allowNull: false,
        min: 1,
        max: 3
      },
      verse: {
        type: DataTypes.INTEGER(3),
        required: true,
        allowNull: false,
        min: 1,
        max: 3
      },
      text: {
        type: DataTypes.STRING(300),
        required: true,
        allowNull: false,
        min: 7,
        max: 300
      }
    },
    {
      timestamps: false
    }
  );
  verses.associate = function(models) {
    // associations can be defined here
  };
  return verses;
};
