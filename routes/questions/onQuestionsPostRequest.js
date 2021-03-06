var methods = require('../../methods');

module.exports = function ( request, response ) {

	delete request.body['g-recaptcha-response'];
	methods.saveNewQuestion( request.body )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};