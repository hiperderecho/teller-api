var Question = require('../models/question');

module.exports = function ( body ) {
	var question = new Question( body );

	return question.save();
};