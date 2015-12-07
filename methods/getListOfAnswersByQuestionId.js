var Answer = require('../models/answer');
var r      = require('../orm').r;

module.exports = function ( questionId ) {

	return Answer.filter( { questionId: questionId } ).execute();
};