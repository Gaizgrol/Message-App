'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		const chats = [];

		// Cria as conversas
		for ( let i=1; i<=5; i++ )
			chats.push({
				name: `Chat ${i}`,
				createdAt: new Date(),
				updatedAt: new Date()
			});

		const relations = [];

		// Adicionamos 2 usuários por chat
		for ( let i=2; i<=6; i++ )
			relations.push({
				chatId: (i-1),
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				chatId: (i-1),
				userId: i,
				createdAt: new Date(),
				updatedAt: new Date()
			},);
		
		await queryInterface.bulkInsert( 'Chats', chats );
		await queryInterface.bulkInsert( 'ChatUsers', relations );
	},
	down: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.bulkDelete( 'Chats', null, {} );
		await queryInterface.bulkDelete( 'ChatUsers', null, {} );
	}
};
