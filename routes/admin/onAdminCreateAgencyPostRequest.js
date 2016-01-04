var methods = require('../../methods');

module.exports = function ( request, response ) {
	var data = request.body;

	methods.saveNewAgency( data )
	.then( function ( result ) {

		response.json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};