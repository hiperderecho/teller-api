var methods = require('../../methods');
var config  = require('../../config');
var adminSession;

module.exports = function ( request, response ) {

	adminSession = request.session;

	if ( request.body.password === config.admin.password
	     && request.body.email === config.admin.email ) {
		adminSession.email = request.body.email;
		response.status(200).json( { success: true } );
		return;
	}

	response.status(403).json( { success: false } );
};