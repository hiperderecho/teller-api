var methods = require('../../methods');

module.exports = function ( request, response ) {
	var questionId = request.params['questionId'];

	methods.getListOfAnswersByQuestionId( questionId )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};