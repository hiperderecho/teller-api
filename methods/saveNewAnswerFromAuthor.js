var Answer   = require('../models/answer');
var Agency   = require('../models/agency');
var emailing = require('../emailing');
var config   = require('../config');
var methods  = require('./');

var createPublicAuthorEmailFromId = function ( id ) {

	return id + '@' + config.emailing.publicHostname;
};

module.exports = function ( body ) {
	var answerToSave = {};
	var answer;
	var emailData    = {};

	answerToSave.questionId = body.questionId;
	answerToSave.content    = methods.redactEmailsFromText( methods.formatHtmlToText( body.content ) );
	answerToSave.author     = createPublicAuthorEmailFromId( body.questionId );
	answerToSave.type       = 'author';

	emailData.from    = createPublicAuthorEmailFromId( body.questionId );
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