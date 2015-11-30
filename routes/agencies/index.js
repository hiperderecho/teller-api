module.exports = function ( app ) {

	app.get ( '/api/agencies/'   , require( './onAgenciesGetRequest' ) );
	app.post( '/api/agencies/'   , require( './onAgenciesPostRequest' ) );
	app.get ( '/api/agencies/:id', require( './onAgenciesIdGetRequest' ) );
};