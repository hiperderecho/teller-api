var emailing = require( '../emailing' );
var Question = require( '../models/question' );
var jade     = require('jade');

module.exports = function ( emailData ) {

	return Question.get( emailData.questionId )
	.run()
	.then( function ( result ) {

		emailData.to = result.author;
		// render boiler plate message
		emailData.html = '';

		return emailing.sendEmail( emailData );
	} );
};