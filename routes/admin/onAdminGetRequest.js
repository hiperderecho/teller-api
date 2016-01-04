var moment = require('moment');

var methods = require('../../methods');
var adminSession;

module.exports = function ( request, response ) {

	adminSession = request.session;
	// adminSession.email = 'true';
	if ( adminSession.email ) {
		methods.getListOfAllQuestions()
		.then( function ( questions ) {

			questions.forEach( function ( question ) {

				question.formattedDate = moment( question.createdAt ).format('YYYY-MM-DD HH:MM');
			} );

			response.render('admin-index', { questions: questions });
		} )
		.catch( function ( error ) {

			response.status(500).render( '500', { error: error.stack } );
		} );
	}
	if ( !adminSession.email ) {
		response.render('admin-signIn');
	}
};