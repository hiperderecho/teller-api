var Agency = require('../models/agency');

module.exports = function ( id ) {

	return Agency.get( id ).run();
};