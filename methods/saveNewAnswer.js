var Answer = require('../models/answer');

var getQuestionIdFromRecipient = function ( recipient ) {
	var newRecipient = recipient.split('-');

	newRecipient.pop();
	newRecipient.pop();
	return newRecipient.join('-');
};

module.exports = function ( body ) {
	var answerToSave = {};
	var answer;

	answerToSave.questionId = getQuestionIdFromRecipient( body.recipient );
	answerToSave.content    = body.bodyHtml;
	answerToSave.author     = body.sender;

	answer = new Answer( answerToSave );
	return answer.save();
};