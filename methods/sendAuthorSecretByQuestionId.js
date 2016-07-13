var fs          = require( 'fs' );
var extend      = require( 'util' )._extend;
var MarkdownIt  = require( 'markdown-it' );
var MdVariables = require( 'mdvariables' );
var getSlug     = require( 'speakingurl' );

var emailing = require( '../emailing' );
var Question = require( '../models/question' );
var config   = require( '../config' );

var src = fs.readFileSync( './views/emailing-question-author-secret-message.md', 'utf8' );

module.exports = function ( questionId ) {
	var emailData = extend( {}, emailing.getBoilerplateEmailData() );
	var md        = new MarkdownIt();

	emailData.subject = config.emailing.authorSecretSubject;
	emailData.from    = config.emailing.noReply;

	return Question.get( questionId )
	.run()
	.then( function ( result ) {
		var mdOptions = {};

		mdOptions.questionPath = 'pidela.info/preguntas/' + questionId + '/' + getSlug( result.title );
		mdOptions.authorSecret = result.authorSecret;

		md.use( MdVariables( function () {

			return mdOptions;
		} ) );

		emailData.to   = result.author;
		emailData.html = md.render( src );

		// Development
		// return true;
		return emailing.sendEmail( emailData );
	} );
};