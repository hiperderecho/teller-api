var methods = require('../../methods');
var adminSession;
var onGetQuestionById = function ( question ) {
	var toReturn = {};

	toReturn.question = question;
	return toReturn;
};
var getListOfAgencies = function ( givens ) {

	return methods.getListOfAgencies()
	.then( function ( agencies ) {

		givens.agencies = agencies;
		return givens;
	} );
}

module.exports = function ( request, response ) {
	var questionId = request.params['questionId'];

	adminSession = request.session;
	adminSession.email = 'true';
	if ( adminSession.email ) {

		methods.getCompleteQuestionByQuestionId( questionId )
		.then( onGetQuestionById )
		.then( getListOfAgencies )
		.then( function ( givens ) {
			var agencyName;

			givens.agencies.forEach( function ( agency ) {

				if ( agency.id === givens.question.agencyId ) {
					givens.question.agencyName = agency.name;
				}
			} );

			response.render('admin-question', { question: givens.question });
		} )
		.catch( function ( error ) {

			response.status(500).render( '500', { error: error.stack } );
		} );

	}
	if ( !adminSession.email ) {
		response.render('admin-signIn');
	}
};