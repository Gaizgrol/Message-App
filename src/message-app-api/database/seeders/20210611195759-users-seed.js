'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		const users = [];

		for ( let i=1; i<=15; i++ )
			users.push({
				name: `Usuário ${i}`,
				createdAt: new Date(),
				updatedAt: new Date()
			});
		
		await queryInterface.bulkInsert( 'Users', users );
	},
	down: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.bulkDelete( 'Users', null, {} );
	}
};
