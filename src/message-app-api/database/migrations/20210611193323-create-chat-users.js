'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.createTable( 'ChatUsers', {
			// Relacionamentos
			chatId: {
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'Chats', key: 'id' },
				type: Sequelize.INTEGER
			},
			userId: {
				allowNull: false,
				onDelete: 'CASCADE',
				references: { model: 'Users', key: 'id' },
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

		// Sequelize não suporta chaves compostas, precisamos inserir a query manualmente
		await queryInterface.sequelize.query(
			'ALTER TABLE `ChatUsers` ADD CONSTRAINT `composite_pk` PRIMARY KEY ( `chatId`, `userId` );'
		);

		// Sequelize não suporta pares únicos, precisamos inserir a query manualmente
		await queryInterface.sequelize.query(
			'ALTER TABLE `ChatUsers` ADD UNIQUE ( `chatId`, `userId` );'
		);
	},
	down: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.dropTable( 'ChatUsers' );
	}
};