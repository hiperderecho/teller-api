var methods = require('../../methods');

module.exports = function ( request, response ) {
	var agencyId = request.params['agencyId']
	  , data     = request.body
	  ;

	methods.updateAgencyByAgencyId( agencyId, data )
	.then( function ( result ) {

		response.json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};