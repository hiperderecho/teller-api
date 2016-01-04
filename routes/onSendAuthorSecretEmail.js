var methods = require('../methods');

module.exports = function ( request, response ) {
	var questionId = request.params['questionId'];

	return methods.sendAuthorSecretByQuestionId( questionId )
	.then( function () {

		response.status(200).json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};