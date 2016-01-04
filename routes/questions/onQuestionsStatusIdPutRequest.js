var methods = require('../../methods');

module.exports = function ( request, response ) {
	var questionId   = request.params['id'];
	var status       = request.body.status;
	var authorSecret = request.body.authorSecret;

	methods.getQuestionById( questionId )
	.then( function ( question ) {

		if ( question.authorSecret === authorSecret ) {
			return methods.updateQuestionStatusByQuestionId( questionId, status )
			.then( function ( result ) {

				response.json( result );
			} );
		}

		if ( question.authorSecret !== authorSecret  ) {
			response.status( 200 ).json( { error: 'Author secret doesn\'t match' } );
		}
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};