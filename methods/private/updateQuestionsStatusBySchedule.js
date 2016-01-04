var moment   = require('moment');

var Question = require('../../models/question');
var methods  = require('../index');
var config   = require('../../config');

var onListOfQuestions = function ( questions ) {
	var now = new Date();

	console.log( '[schedule-tick]', now );
	questions.forEach( function ( question ) {

		if ( now > moment( question.createdAt ).add(5, 'days').toDate() ) {

			methods.updateQuestionStatusByQuestionId( question.id, config.schedule.unansweredStatus )
			.catch( function ( error ) { console.log.bind( console ) } );
		}
	} );
	return true;
};

module.exports = function () {

	return methods.getListOfQuestionsWithStatusOpen()
	.then( onListOfQuestions );
};