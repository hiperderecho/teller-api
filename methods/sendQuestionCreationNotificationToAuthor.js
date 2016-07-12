var fs          = require( 'fs' );
var MarkdownIt  = require( 'markdown-it' );
var MdVariables = require( 'mdvariables' );
var getSlug     = require( 'speakingurl' );

var emailing = require( '../emailing' );
var Question = require( '../models/question' );

var src = fs.readFileSync( './views/emailing-question-creation-notification.md', 'utf8' );

module.exports = function ( emailData ) {
	var mdOptions = {};
	var md        = new MarkdownIt();

	mdOptions.questionPath = 'pidela.info/preguntas/' + emailData.question.id + '/' + getSlug( emailData.question.title );
	mdOptions.authorSecret = emailData.question.authorSecret;

	md.use( MdVariables( function () {

		return mdOptions;
	} ) );

	emailData.to   = emailData.question.author;
	emailData.html = md.render( src );

	return emailing.sendEmail( emailData );
};