module.exports = function ( app ) {

	app.get ( '/api/questions/'            , require( './onQuestionsGetRequest' ) );
	app.post( '/api/questions/'		         , require( './onQuestionsPostRequest' ) );
	app.get ( '/api/questions/count'       , require( './onQuestionsCountGetRequest' ) );
	app.get ( '/api/questions/:id'         , require( './onQuestionsIdGetRequest' ) );
	app.put ( '/api/questions/:id'         , require( './onQuestionsIdPutRequest' ) );
	app.put ( '/api/questions/status/:id'  , require( './onQuestionsStatusIdPutRequest' ) );
	app.get ( '/api/questions/search/:page', require( './onQuestionsSearchGetRequest' ) );
};