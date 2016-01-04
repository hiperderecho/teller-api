var Question = require('../models/question');
var r        = require('../orm').r;

// Will return all questions except the flagged ones
var statusFilter = function ( doc ) {

	return r.expr( ['flagged'] )
	.contains( doc('status') )
	.not();
};

module.exports = function ( limit ) {

	if ( limit ) {
		return Question.orderBy( { index: r.desc('createdAt') } ).without('authorSecret').filter( statusFilter ).limit( +limit ).execute();
	}
	if ( !limit ) {
		return Question.orderBy( { index: r.desc('createdAt') } ).without('authorSecret').filter( statusFilter ).execute();
	}
	// return Question.orderBy( { index: 'createdAt' } ).filter( statusFilter ).run();
};