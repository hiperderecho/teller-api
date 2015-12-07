module.exports = function ( app ) {

	// root
	app.get( '/', require( './onIndexGetRequest' ) );

	// endpoints
	require( './questions' )( app );
	require( './agencies'  )( app );
	require( './answers'   )( app );
};