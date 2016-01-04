var methods = require('../../methods');

module.exports = function ( request, response ) {
	var questionId   = request.params['id'];
	var property     = request.query['property'] || request.body.property;
	var newState     = request.query['newState'] || request.body.newState;
	var updateObject = {};

	updateObject[ property ] = newState;

	methods.updateQuestionByQuestionId( questionId, updateObject )
	.then( function ( result ) {

		response.json( result );
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};