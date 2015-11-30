var Question = require('../models/question');

module.exports = function () {

	return Question.orderBy({ index: 'createdAt' }).run();
};