'use strict';
const { Model } = require('sequelize');

module.exports = ( sequelize, DataTypes ) =>
{
	class ChatUsers extends Model
	{
		static associate( models )
		{
			ChatUsers.belongsTo( models.User );
			ChatUsers.belongsTo( models.Chat );
		}
	};

	ChatUsers.init({
		chatId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'ChatUsers',
	});
	
	return ChatUsers;
};