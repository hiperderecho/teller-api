var adminSession;

module.exports = function ( request, response ) {

	adminSession = request.session;
	// adminSession.email = 'true';
	if ( adminSession.email ) {
		response.render('admin-create-agency');
	}
	if ( !adminSession.email ) {
		response.render('admin-signIn');
	}
};