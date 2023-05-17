'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      home_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      away_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      in_progress: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
