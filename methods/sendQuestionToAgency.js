var fs          = require( 'fs' );
var MarkdownIt  = require( 'markdown-it' );
var MdVariables = require( 'mdvariables' );

var emailing = require( '../emailing' );
var Agency   = require( '../models/agency' );

var src = fs.readFileSync( './views/emailing-question-to-agency-message.md', 'utf8' );

module.exports = function ( emailData ) {
	var md  = new MarkdownIt();

	md.use( MdVariables( function () {

		return { fullName: emailData.fullName, dni: emailData.dni, address: emailData.address, content: '<pre>'+emailData.content+'</pre>' };
	} ) );

	return Agency.get( emailData.agencyId )
	.run()
	.then( function ( result ) {

		emailData.to   = result.email;
		emailData.html = md.render( src );
		return emailing.sendEmail( emailData );
	} );
};