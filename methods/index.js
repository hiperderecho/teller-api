var exports = module.exports = {};

// Questions
exports.getListOfQuestions = require( './getListOfQuestions' );
exports.getQuestionById    = require( './getQuestionById' );
exports.saveNewQuestion    = require( './saveNewQuestion' );

// Answers
exports.saveNewAnswer                = require( './saveNewAnswer' );
exports.getListOfAnswersByQuestionId = require( './getListOfAnswersByQuestionId' );

// Agencies
exports.getListOfAgencies  = require( './getListOfAgencies' );
exports.getAgencyById      = require( './getAgencyById' );
exports.saveNewAgency      = require( './saveNewAgency' );

// Emailing
exports.sendQuestionToAgency = require( './sendQuestionToAgency' );