'use strict';
module.exports = {
	up: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.bulkInsert( 'Messages', [{
			content: 'Teste 1',
			userId: 1,
			chatId: 1
		},{
			content: 'Teste 2',
			userId: 2,
			chatId: 1
		},{
			content: 'Teste 1',
			userId: 1,
			chatId: 2
		},{
			content: 'Teste 2',
			userId: 3,
			chatId: 2
		},{
			content: 'Teste 1',
			userId: 1,
			chatId: 3
		},{
			content: 'Teste 2',
			userId: 4,
			chatId: 3
		},{
			content: 'Teste 1',
			userId: 1,
			chatId: 4
		},{
			content: 'Teste 2',
			userId: 5,
			chatId: 4
		},{
			content: 'Teste 1',
			userId: 1,
			chatId: 5
		},{
			content: 'Teste 2',
			userId: 6,
			chatId: 5
		},] );
	},
	down: async ( queryInterface, Sequelize ) =>
	{
		await queryInterface.bulkDelete( 'Messages', null, {} );
	}
};
