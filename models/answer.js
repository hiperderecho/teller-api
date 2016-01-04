var thinky = require('../orm').thinky;
var r      = require('../orm').r;
var type   = require('../orm').type;

var methods = require('../methods');
var config  = require('../config');

var Answer = thinky.createModel('answers',
{ id          : type.string()
, questionId  : type.string().required()
, content     : type.string().required()
, author      : type.string().email()
, attachment  : type.string()
, attachments : [{ originalname: type.string(), filename: type.string(), mimeType: type.string(), size: type.number() }]
, type        : type.string()
, createdAt   : type.date().default( r.now() )
} );

Answer.post( 'save', function ( next ) {
	var self      = this;
	// var emailData = {};

	// emailData.from    = config.emailing.noReply;
	// emailData.to      = '';
	// emailData.subject = config.emailing.questionStatusChangedSubject;
	// emailData.html    = '';

	methods.updateQuestionByQuestionId( self.questionId, { status: 'unsuccessful' } )
	.then( function () {
		next();
	} );
	// .then( methods.sendQuestionStatusChangedNotificationToAuthor( emailData ) );
} );

Answer.ensureIndex('createdAt');

module.exports = Answer;