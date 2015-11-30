module.exports = function ( app ) {

	app.get ( '/api/questions/'   , require( './onQuestionsGetRequest' ) );
	app.post( '/api/questions/'		, require( './onQuestionsPostRequest' ) );
	app.get ( '/api/questions/:id', require( './onQuestionsIdGetRequest' ) );
};