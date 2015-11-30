var emailing = require( '../emailing' );
var Agency   = require( '../models/agency' );

module.exports = function ( emailData ) {

	return Agency.get( emailData.to )
	.run()
	.then( function ( result ) {

		emailData.to = result.email;
		return emailing.sendEmail( emailData );
	} );
};