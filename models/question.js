var shortid = require('shortid');

var thinky = require('../orm').thinky;
var r      = require('../orm').r;
var type   = require('../orm').type;

var methods = require('../methods');
var config  = require('../config');

var createPublicAuthorEmail = function ( id, author ) {
	var emailParts = author.split('@');

	return id + '-' + emailParts[0] + '-' + emailParts[1] + '@' + config.emailing.publicHostname;
};

var createPublicAuthor = function ( id, author ) {
	var emailParts = author.split('@');

	return id + '-' + emailParts[0] + '-' + emailParts[1];
};

var createPublicAuthoringCredentials = function ( id, author ) {

	// Will fail if table is empty
	return r.table('questions')
	.filter( r.row('id').eq( id ) )
	.update( { publicAuthorEmail: createPublicAuthorEmail( id, author )
	         , publicAuthor     : createPublicAuthor( id, author )
	         } )
	.run();
};

var Question = thinky.createModel('questions',
{ id                : type.string().default( function () { return shortid.generate(); } )
, title             : type.string().required().min(5).max(60)
, content           : type.string().required().min(40).max(800)
, status            : type.string().default('open')
, author            : type.string().email().required()
, authorSecret      : type.string().default( r.uuid() )
, authorFullName    : type.string().min(5).max(60)
, publicAuthorEmail : type.string()
, publicAuthor      : type.string()
, agencyId          : type.string()
, createdAt         : type.date().default( r.now() )
}
);

// Will create a fake email after save
Question.post( 'save', function ( next ) {
	var self = this;

	createPublicAuthoringCredentials( self.id, self.author )
	.then( function () {
		self.publicAuthorEmail = createPublicAuthorEmail( self.id, self.author );
		self.publicAuthor      = createPublicAuthor( self.id, self.author );

		methods.sendQuestionToAgency(
		  { from     : self.publicAuthorEmail
		  , agencyId : self.agencyId
		  , subject  : self.title
		  , html     : self.content
		  } )
		.then( function () {
			return methods.sendQuestionCreationNotificationToAuthor(
			{ from     : config.emailing.noReply
			, subject  : config.emailing.questionCreationSubject
			, html     : ''
			, question : self
			} )
		} )
		.catch( function ( error ) {
			console.log( 'CONFIG', process.env.TELLER_EMAILING_APIKEY, process.env.TELLER_EMAILING_DOMAIN );
			console.log( 'sendQuestionToAgency error', error );
			throw new Error( 'Couldn\'t send Email: ' + error );
		} );
		next();
	} )
	.catch( function ( error ) {
		console.error( error );
		next();
	} );
} );

Question.ensureIndex('createdAt');

module.exports = Question;