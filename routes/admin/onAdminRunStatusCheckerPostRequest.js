var methods = require('../../methods');

module.exports = function ( request, response ) {

	methods.updateQuestionsStatusBySchedule()
	.then( function ( result ) {

		response.json( { success: true } );
	} )
	.catch( function ( error ) {

		response.status(500).json( { error: error.stack } );
	} );
};