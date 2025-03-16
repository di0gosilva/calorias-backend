'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Removendo a coluna 'updatedAt' das tabelas
    await queryInterface.removeColumn('meals', 'updatedAt');
    await queryInterface.removeColumn('meal_items', 'updatedAt');
    await queryInterface.removeColumn('food_database', 'updatedAt');
  },

  async down (queryInterface, Sequelize) {
    // Adicionando novamente a coluna 'updatedAt' caso a migration seja revertida
    await queryInterface.addColumn('meals', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    });

    await queryInterface.addColumn('meal_items', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    });

    await queryInterface.addColumn('food_database', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    });
  }
};
