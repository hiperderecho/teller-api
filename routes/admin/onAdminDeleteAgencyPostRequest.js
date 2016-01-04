var methods = require('../../methods');

module.exports = function ( request, response ) {
	var agencyId = request.params['agencyId'];

	methods.deleteAgencyByAgencyId( agencyId )
	.then( function ( result ) {

		response.json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};