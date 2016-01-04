var methods = require('./index');

module.exports = function ( questionId, status ) {

	return methods.updateQuestionByQuestionId( questionId, { status: status } );
};