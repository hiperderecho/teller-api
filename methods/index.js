var exports = module.exports = {};

// Questions
exports.getListOfQuestions = require( './getListOfQuestions' );
exports.getQuestionById    = require( './getQuestionById' );
exports.saveNewQuestion    = require( './saveNewQuestion' );

// Agencies
exports.getListOfAgencies  = require( './getListOfAgencies' );
exports.getAgencyById      = require( './getAgencyById' );
exports.saveNewAgency      = require( './saveNewAgency' );

// Emailing
exports.sendQuestionToAgency = require( './sendQuestionToAgency' );