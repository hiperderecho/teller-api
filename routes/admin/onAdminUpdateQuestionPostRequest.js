var methods = require('../../methods');

module.exports = function ( request, response ) {
	var questionId = request.params['questionId']
	  , data       = request.body
	  ;

	methods.updateQuestionByQuestionId( questionId, data )
	.then( function ( result ) {

		response.json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};