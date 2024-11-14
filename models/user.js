'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email nya sudah dipakai sob"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required ya"
        },
        notEmpty: {
          msg: "Email is required ya"
        },
        isEmail: {
          args: true,
          msg: "Harus format email ya"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required ya"
        },
        notEmpty: {
          msg: "Password is required ya"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      // defaultValue: "Staff"
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        console.log(user.password, '<-- di hooks')
        user.password = hashPass(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};