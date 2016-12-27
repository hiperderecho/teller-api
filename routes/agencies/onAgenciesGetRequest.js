var _ = require('lodash');

var methods = require('../../methods');

module.exports = function ( request, response ) {

	if ( request.query && request.query['orderBy'] ) {
		Promise.all( [ methods.getListOfAgenciesOrderedByQuestionMetaStatus( { metaStatus:request.query['orderBy'] } )
		             , methods.getListOfAgencies()
		             ] )
		.then( function ( result ) {
			var agenciesByMetaStatus = result[0];
			var agencies             = result[1];

			response.json( agenciesByMetaStatus.map( function ( agency ) {

				return { name: _.find( agencies, ['id', agency.group] ).name, count: agency.reduction };
			} ) );
			return;
		} )
		.catch( function ( error ) {

			response.status( 500 ).send( { error: error.message } );
		} );
		return;
	}
	methods.getListOfAgencies()
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};