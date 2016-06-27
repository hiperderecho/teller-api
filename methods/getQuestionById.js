var Question = require('../models/question');

module.exports = function ( id ) {

	return Question.get( id ).without('g-recaptcha-response').without('authorSecret').without('publicAuthor').without('author').execute();
};