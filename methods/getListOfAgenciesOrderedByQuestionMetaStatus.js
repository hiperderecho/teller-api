var Agency   = require('../models/agency');
var Question = require('../models/question');

var r        = require('../orm').r;

module.exports = function ( givens ) {

	if ( givens.metaStatus === 'sent' ) {
		return Question.filter( r.row('status').eq('successful')
		                        .or( r.row('status').eq('unsuccessful') )
		                        .or( r.row('status').eq('unanswered') )
		                        .or( r.row('status').eq('open') )
		                      ).group('agencyId').count().ungroup().orderBy(r.desc('reduction')).execute();
	}
	if ( givens.metaStatus === 'answered' ) {
		return Question.filter( r.row('status').eq('successful').or( r.row('status').eq('unsuccessful') ) )
		.group('agencyId').count().ungroup().orderBy(r.desc('reduction')).execute();
	}
	return Question.group('agencyId').count().ungroup().orderBy(r.desc('reduction')).execute();
};