var Question = require('../models/question');
var r        = require('../orm').r;
var methods  = require('./');

// Will return all questions except the flagged ones
var statusFilter = function ( doc ) {

	return r.expr( ['flagged'] )
	.contains( doc('status') )
	.not();
};

var titleFilter = function ( doc, filter ) {

	return doc('title').downcase().match( filter.toLowerCase() );
};

module.exports = function ( givens ) {
	var limit    = givens && givens.limit    || null;
	var skip     = givens && givens.skip     || 0;
	var filter   = givens && givens.filter   || '';
	var agencyId = givens && givens.agencyId || '';

	if ( agencyId ) {
		return Question.orderBy( { index: r.desc('createdAt') } )
		.without('g-recaptcha-response')
		.without('authorSecret')
		.filter( statusFilter )
		.filter( function ( doc ) {

			return doc('title').downcase().match( methods.caseAndAccentInsensitiveFilter( filter ) );
		} )
		.filter( { agencyId: agencyId } )
		.skip( +skip )
		.limit( +limit )
		.execute();
	}
	if ( !limit ) {
		return Question.orderBy( { index: r.desc('createdAt') } )
		.without('g-recaptcha-response')
		.without('authorSecret')
		.filter( statusFilter )
		.filter( function ( doc ) {

			return doc('title').downcase().match( methods.caseAndAccentInsensitiveFilter( filter ) );
		} )
		.skip( +skip )
		.execute();
	}
	if ( !agencyId ) {
		return Question.orderBy( { index: r.desc('createdAt') } )
		.without('g-recaptcha-response')
		.without('authorSecret')
		.filter( statusFilter )
		.filter( function ( doc ) {

			return doc('title').downcase().match( methods.caseAndAccentInsensitiveFilter( filter ) );
		} )
		.skip( +skip )
		.limit( +limit )
		.execute();
	}
};