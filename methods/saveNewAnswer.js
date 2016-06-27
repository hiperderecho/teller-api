var Answer  = require('../models/answer');
var methods = require('./');

var getQuestionIdFromRecipient = function ( recipient ) {
	var newRecipient = recipient.split('@');

	return newRecipient[0];
};

var isValidSender = function ( sender ) {
	var agencyHostname = sender.split('@')[1];

	return methods.getListOfAgencies()
	.then( function ( agencies ) {
		var isValid = false;

		agencies.forEach( function ( agency ) {

			if ( !!~agency.email.indexOf( agencyHostname ) ) {
				isValid = true;
			}
		} );
		return isValid;
	} );
};

module.exports = function ( body ) {
	var answerToSave = {};
	var answer;
	var attachment = {};

	answerToSave.questionId  = getQuestionIdFromRecipient( body.recipient );
	answerToSave.content     = body.bodyHtml;
	answerToSave.author      = body.sender;
	answerToSave.type        = 'agency';
	answerToSave.attachments = body.attachments;

	return isValidSender( body.sender )
	.then( function ( result ) {

		if ( !result ) {
			throw new Error('Not a valid agency');
		}
		answer = new Answer( answerToSave );
		return answer.save();
	} )
	.catch( console.log.bind( console ) );
};