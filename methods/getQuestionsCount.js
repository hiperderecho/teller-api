var Question = require('../models/question');
var r        = require('../orm').r;

// Will return all questions except the flagged ones
var statusFilter = function ( doc ) {

	return r.expr( ['flagged'] )
	.contains( doc('status') )
	.not();
};

module.exports = function ( givens ) {
	var skip     = givens && givens.skip     || 0;
	var filter   = givens && givens.filter   || '';
	var agencyId = givens && givens.agencyId || '';

	if ( agencyId && filter ) {
		return Question
		.filter( statusFilter )
		.filter( r.row('title').match( filter ) )
		.filter( { agencyId: agencyId } )
		.skip( +skip )
		.count()
		.execute();
	}
	if ( filter ) {
		return Question
		.filter( statusFilter )
		.filter( r.row('title').match( filter ) )
		.skip( +skip )
		.count()
		.execute();
	}
	if ( agencyId ) {
		return Question
		.filter( statusFilter )
		.filter( { agencyId: agencyId } )
		.skip( +skip )
		.count()
		.execute();
	}
	if ( !agencyId && !filter ) {
		return Question
		.filter( statusFilter )
		.filter( r.row('title').match( filter ) )
		.skip( +skip )
		.count()
		.execute();
	}
};