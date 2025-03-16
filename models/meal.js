'use strict';
const { Model, DataTypes } = require('sequelize')
const Database = require("../config/database")

module.exports = () => {
  const sequelize = Database.getInstance()
  class Meal extends Model {
    static associate(models) {
      // define association here
      Meal.belongsTo(models.User, { 
        foreignKey: 'user_id',
        as: 'user'
      })

      Meal.hasMany(models.MealItem, {
        foreignKey: 'meal_id',
        as: 'items',
        onDelete: 'CASCADE'
      })
    }
  }

  Meal.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    meal_type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "meal_type"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Meal',
    tableName: 'meals',
    timestamps: true,
    underscored: true
  })

  return Meal
}