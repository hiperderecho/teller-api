module.exports = function ( app ) {

	app.get ( '/api/answers/:questionId', require( './onAnswersQuestionIdGetRequest' ) );
	app.post( '/api/answers/'           , require( './onAnswersPostRequest' ) );
	app.post( '/api/answers/fromAuthor/', require( './onAnswersFromAuthorPostRequest' ) );
};