var methods = require('../../methods');

module.exports = function ( request, response ) {

	request.session.destroy( function ( error ) {

		if ( error ) { response.status(500).render( '500', { error: error.stack } ) }

		response.redirect('/admin');

	} );
};