'use strict';
const { Model, DataTypes } = require('sequelize')
const Database = require("../config/database")

module.exports = () => {
  const sequelize = Database.getInstance()

  class MealItem extends Model {
    static associate(models) {
      // define association here
      MealItem.belongsTo(models.Meal, {
        foreignKey: 'meal_id',
        as: 'meal',
        onDelete: 'CASCADE'
      });
      MealItem.belongsTo(models.FoodDatabase, {
        foreignKey: 'food_id',
        as: 'food',
        onDelete: 'CASCADE'
      });
    }
  }

  MealItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meals',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    food_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'food_database',
        key: 'id'
      },
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'MealItem',
    tableName: 'meal_items',
    underscored: true,
    timestamps: true
  })
  
  return MealItem
}