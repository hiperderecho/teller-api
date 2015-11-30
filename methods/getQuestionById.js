var Question = require('../models/question');

module.exports = function ( id ) {

	return Question.get( id ).run();
};