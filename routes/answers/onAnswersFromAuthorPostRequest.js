var methods = require( '../../methods' );

module.exports = function ( request, response ) {
	var authorSecret = request.body.authorSecret;
	var questionId   = request.body.questionId;

	methods.getCompleteQuestionByQuestionId( questionId )
	.then( function ( question ) {

		if ( question.authorSecret === authorSecret ) {
			return 	methods.saveNewAnswerFromAuthor( request.body )
			.then( function ( result ) {

				response.json( result );
			} );
		}

		if ( question.authorSecret !== authorSecret ) {
			response.status( 200 ).json( { error: 'Author secret doesn\'t match' } );
		}
	} )
	.catch( function ( error ) {

		response.status( 500 ).send( { error: error.message } );
	} );
};