'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true, // email format
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "User"
    },
    image: {
      type: DataTypes.STRING(1000000),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};