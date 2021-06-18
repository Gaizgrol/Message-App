'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.createTable( 'Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				unique: true
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
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
		await queryInterface.dropTable( 'Users' );
	}
};