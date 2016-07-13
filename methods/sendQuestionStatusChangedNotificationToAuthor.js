var fs          = require( 'fs' );
var MarkdownIt  = require( 'markdown-it' );
var MdVariables = require( 'mdvariables' );
var getSlug     = require( 'speakingurl' );

var emailing = require( '../emailing' );
var Question = require( '../models/question' );

var src = fs.readFileSync( './views/emailing-question-has-new-answer-notification.md', 'utf8' );

module.exports = function ( emailData ) {
	var md  = new MarkdownIt();

	return Question.get( emailData.questionId )
	.run()
	.then( function ( result ) {
		var mdOptions = {};

		mdOptions.questionPath = 'pidela.info/preguntas/' + emailData.questionId + '/' + getSlug( result.title );
		mdOptions.authorSecret = result.authorSecret;

		md.use( MdVariables( function () {

			return mdOptions;
		} ) );

		emailData.to   = result.author;
		emailData.html = md.render( src );

		return emailing.sendEmail( emailData );
	} );
};