var methods = require( '../../methods' );

module.exports = function ( request, response ) {

	methods.saveNewAnswer( request.body )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		if ( !!~error.message.indexOf('Not a valid agency') ) {
			response.status( 401 ).send( { error: 'Not a valid agency' } );
			return;
		}
		response.status(500).send( { error: error.message } );
	} );
};