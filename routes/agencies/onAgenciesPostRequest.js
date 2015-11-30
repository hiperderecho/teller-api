var methods = require( '../../methods' );

module.exports = function ( request, response ) {

	methods.saveNewAgency( request.body )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status(500).send( { error: error.message } );
	} );
};