module.exports = function ( app ) {

	app.get ( '/api/answers/:questionId', require( './onAnswersQuestionIdGetRequest' ) );
	app.post( '/api/answers/'           , require( './onAnswersPostRequest' ) );
};