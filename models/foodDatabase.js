'use strict';
const { Model, DataTypes } = require('sequelize')
const Database = require("../config/database")

module.exports = () => {
  const sequelize = Database.getInstance()

  class FoodDatabase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodDatabase.hasMany(models.MealItem, { 
        foreignKey: 'food_id', 
        as: 'mealItems' 
      })
    }
  }

  FoodDatabase.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'manual'
    },
  }, {
    sequelize,
    modelName: 'FoodDatabase',
    tableName: 'food_database',
    timestamps: true,
    underscored: true
  })

  return FoodDatabase
}