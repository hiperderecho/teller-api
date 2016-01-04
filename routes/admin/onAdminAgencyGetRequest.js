var methods = require('../../methods');
var adminSession;

module.exports = function ( request, response ) {
	var agencyId = request.params['agencyId'];

	adminSession = request.session;
	// adminSession.email = 'true';
	if ( adminSession.email ) {
		methods.getAgencyById( agencyId )
		.then( function ( agency ) {

			response.render('admin-agency', { agency: agency } );
		} )
		.catch( function ( error ) {

			response.status(500).render( '500', { error: error.stack } );
		} );
	}
	if ( !adminSession.email ) {
		response.render('admin-signIn');
	}
};