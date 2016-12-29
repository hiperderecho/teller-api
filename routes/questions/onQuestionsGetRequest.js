var methods = require('../../methods');

module.exports = function ( request, response ) {

	methods.getListOfQuestions( {limit:request.query['limit'], skip:request.query['skip']} )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};