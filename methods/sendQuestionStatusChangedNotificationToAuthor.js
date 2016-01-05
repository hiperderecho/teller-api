var emailing = require( '../emailing' );
var Question = require( '../models/question' );
var jade     = require( 'jade' );
var getSlug  = require( 'speakingurl' );

module.exports = function ( emailData ) {

	return Question.get( emailData.questionId )
	.run()
	.then( function ( result ) {
		var jadeOptions = {};

		jadeOptions.questionPath = 'pidela.info/preguntas/' + emailData.questionId + '/' + getSlug( result.title );

		emailData.to   = result.author;
		emailData.html = jade.renderFile( 'views/emailing-question-has-new-answer-notification.jade', jadeOptions );

		return emailing.sendEmail( emailData );
	} );
};