var Answer   = require('../models/answer');
var Agency   = require('../models/agency');
var emailing = require('../emailing');

module.exports = function ( body ) {
	var answerToSave = {};
	var answer;
	var emailData    = {};

	answerToSave.questionId = body.questionId;
	answerToSave.content    = body.content;
	answerToSave.author     = body.publicAuthorEmail;
	answerToSave.type       = 'author';

	emailData.from    = body.publicAuthorEmail;
	emailData.subject = '[RE] ' + body.title;
	emailData.html    = body.content;

	answer = new Answer( answerToSave );

	return Agency.get( body.agencyId )
	.run()
	.then( function ( agencyResult ) {
		var toReturn = {};

		toReturn.agencyResult = agencyResult;
		return answer.save()
		.then( function ( saveResult ) {

			toReturn.saveResult = saveResult;
			return toReturn;
		} );
	} )
	.then( function ( givens ) {

		emailData.to = givens.agencyResult.email;
		return emailing.sendEmail( emailData );
	} );
};