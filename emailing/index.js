var config  = require( '../config' );
var mailgun = require( 'mailgun-js' )({ apiKey: config.emailing.apiKey, domain: config.emailing.domain });
var exports = module.exports = {};

var emailData =
{ from    : 'default from'
, to      : 'default to'
, subject : 'default subject'
, html    : 'default content'
};

exports.sendEmail = function ( externalEmailData ) {
	console.log( 'SEND EMAIL', externalEmailData );
	return mailgun.messages().send( externalEmailData || emailData )
	.then( function ( result ) {
		// console.log( 'result', result );
	}, function ( error ) {
		console.log( 'error', error );
	} );
};

exports.getBoilerplateEmailData = function () {
	return emailData;
};