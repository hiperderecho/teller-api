var Question = require('../../models/question');

module.exports = function ( questionId, updateObject ) {

	return Question.get( questionId ).update( updateObject );
};