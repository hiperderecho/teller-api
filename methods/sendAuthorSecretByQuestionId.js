var emailing = require( '../emailing' );
var Question = require( '../models/question' );
var config   = require( '../config' );
var extend   = require( 'util' )._extend;
var jade     = require( 'jade' );
var getSlug  = require( 'speakingurl' );

module.exports = function ( questionId ) {
	var emailData = extend( {}, emailing.getBoilerplateEmailData() );

	emailData.subject = config.emailing.authorSecretSubject;
	emailData.from    = config.emailing.noReply;

	return Question.get( questionId )
	.run()
	.then( function ( result ) {
		var jadeOptions = {};

		jadeOptions.questionPath = 'pidela.info/preguntas/' + questionId + '/' + getSlug( result.title );
		jadeOptions.authorSecret = result.authorSecret;

		emailData.to   = result.author;
		emailData.html = jade.renderFile( 'views/emailing-question-author-secret-message.jade', jadeOptions );

		// Development
		// return true;
		return emailing.sendEmail( emailData );
	} );
};