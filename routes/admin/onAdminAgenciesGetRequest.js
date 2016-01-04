var methods = require('../../methods');
var adminSession;

module.exports = function ( request, response ) {

	adminSession = request.session;
	// adminSession.email = 'true';
	if ( adminSession.email ) {
		methods.getListOfAgencies()
		.then( function ( agencies ) {

			response.render('admin-agencies', { agencies: agencies });
		} )
		.catch( function ( error ) {

			response.status(500).render( '500', { error: error.stack } );
		} );
	}
	if ( !adminSession.email ) {
		response.render('admin-signIn');
	}
};