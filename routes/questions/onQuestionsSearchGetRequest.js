var methods = require('../../methods');
var config  = require('../../config');

module.exports = function ( request, response ) {
	var q          = request.query  && request.query.q;
	var agencyName = request.query  && request.query.agency;
	var page       = request.params && request.params.page || 0;
	// fn declarations
	var filterAgencyName;

	filterAgencyName = function ( agencyFromDB ) {
		return agencyFromDB.name.toLowerCase() === agencyName.toLowerCase();
	};
	methods.getListOfAgencies()
	.then( function ( agencies ) {
		var agencyId = agencyName && agencies.filter( filterAgencyName )[0]
		                          && agencies.filter( filterAgencyName )[0].id
		                          || null;

		Promise.all( [ methods.getListOfQuestions( { limit    : config.searchResults.resultsPerPage
		                                           , skip     : config.searchResults.resultsPerPage * page
		                                           , filter   : q
		                                           , agencyId : agencyId
		                                           } )
		             , methods.getQuestionsCount( { filter   : q
		                                          , agencyId : agencyId} )
		             ] )
		.then( function ( result ) {

			response.json( { count: result[1], result: result[0] } );
		} );
		return;
	} );
};