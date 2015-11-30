var methods = require('../../methods');

module.exports = function ( request, response ) {
	var id = request.params['id'];

	methods.getAgencyById( id )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};