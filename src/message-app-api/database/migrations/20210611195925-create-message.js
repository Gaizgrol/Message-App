'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.createTable( 'Messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				unique: true
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING
			},
			
			// Relacionamentos
			userId: {
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'Users', key: 'id' },
				type: Sequelize.INTEGER
			},
			chatId: {
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'Chats', key: 'id' },
				type: Sequelize.INTEGER
			},

			// Metadados
			createdAt: {
				allowNull: false,
				defaultValue: Sequelize.NOW,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				defaultValue: Sequelize.NOW,
				type: Sequelize.DATE
			}
		});
	},
	down: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.dropTable( 'Messages' );
	}
};