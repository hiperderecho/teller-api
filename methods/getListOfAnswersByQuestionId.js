var Answer = require('../models/answer');
var r      = require('../orm').r;

module.exports = function ( questionId ) {

	return Answer.orderBy( { index: r.asc('createdAt') } ).filter( { questionId: questionId } ).execute();
};