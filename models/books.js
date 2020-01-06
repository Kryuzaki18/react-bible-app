"use strict";
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define(
    "books",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(30),
        required: true,
        allowNull: false,
        min: 3,
        max: 30,
        unique: true
      },
      testament: {
        type: DataTypes.STRING(3),
        required: true,
        allowNull: false,
        min: 3,
        max: 3
      },
      chaptersCount: {
        type: DataTypes.INTEGER
      },
      versesCount: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
  books.associate = function(models) {
    // books.hasMany(models.verses, { as: "verses" });
  };
  return books;
};
