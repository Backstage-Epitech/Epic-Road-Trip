'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
    }
  }
  History.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },


    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },


    keyword: { type: DataTypes.STRING }
  },

    {
      sequelize,
      modelName: 'history',
    });
  return History;
};