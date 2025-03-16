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
    await queryInterface.addColumn('meal_items', 'food_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'food_database',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('food_database', 'source', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'api'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('meal_items', 'food_id');
    await queryInterface.removeColumn('food_database', 'source');
  }
};
