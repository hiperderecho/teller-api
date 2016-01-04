module.exports = function ( app ) {

	// root
	app.get( '/'                                       , require( './onIndexGetRequest' ) );
	app.get( '/utils/sendAuthorSecretEmail/:questionId', require('./onSendAuthorSecretEmail') );

	// endpoints
	require( './questions' )( app );
	require( './agencies'  )( app );
	require( './answers'   )( app );
	require( './admin'     )( app );
};