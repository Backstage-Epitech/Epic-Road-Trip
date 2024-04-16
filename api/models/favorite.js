'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init({
    favorite: {
      type: DataTypes.STRING
    },

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
  },

    {
      sequelize,
      modelName: 'favorite',
    });
  return Favorite;
};