var Question = require('../../models/question');
var r        = require('../../orm').r;

module.exports = function () {

	return Question.orderBy( { index: r.desc('createdAt') } ).run();
};