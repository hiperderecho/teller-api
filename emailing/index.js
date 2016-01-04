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

	console.log( '[send-email]', externalEmailData );
	return mailgun.messages().send( externalEmailData || emailData )
	.then( function ( result ) {

		console.log( '[mailgun-result]', result );
		return true;
	}, function ( error ) {

		console.log( '[mailgun-error]', error );
		return error;
	} );
};

exports.getBoilerplateEmailData = function () {
	return emailData;
};