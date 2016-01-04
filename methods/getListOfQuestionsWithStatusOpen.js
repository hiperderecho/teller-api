var Question = require('../models/question');
var r        = require('../orm').r;

// Will return all questions except the flagged ones
var statusFilter = function ( doc ) {

	return r.expr( ['open'] )
	.contains( doc('status') );
};

module.exports = function () {

	// return Question.orderBy( { index: 'createdAt' } ).without('authorSecret').filter( statusFilter ).execute();
	return Question.orderBy( { index: 'createdAt' } ).filter( statusFilter ).run();
};