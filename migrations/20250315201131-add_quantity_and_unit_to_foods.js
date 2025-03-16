'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('food_database', 'calories_per_100g', 'calories')
    await queryInterface.addColumn('food_database', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
    await queryInterface.addColumn('food_database', 'unit', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('food_database', 'calories', 'calories_per_100g')
    await queryInterface.removeColumn('food_database', 'quantity')
    await queryInterface.removeColumn('food_database', 'unit')
  }
};
