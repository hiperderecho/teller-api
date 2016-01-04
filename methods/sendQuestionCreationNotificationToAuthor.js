var emailing = require( '../emailing' );
var Question = require( '../models/question' );
var jade     = require( 'jade' );
var getSlug  = require( 'speakingurl' );

module.exports = function ( emailData ) {
	var jadeOptions = {};

	jadeOptions.questionPath = 'pidela.info/preguntas/' + emailData.question.id + '/' + getSlug( emailData.question.title );
	jadeOptions.authorSecret = emailData.question.authorSecret;

	emailData.to   = emailData.question.author;
	emailData.html = jade.renderFile( 'views/emailing-question-creation-notification.jade', jadeOptions );

	return emailing.sendEmail( emailData );
};