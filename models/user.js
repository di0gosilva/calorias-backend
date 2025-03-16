'use strict';
const { Model, DataTypes } = require('sequelize')
const Database = require("../config/database")

module.exports = () => {
  const sequelize = Database.getInstance()

  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Meal, {
        foreignKey: 'user_id', 
        as: 'meals'
      })
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "local"
    },
    provider_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "none"
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true
  })

  return User
}