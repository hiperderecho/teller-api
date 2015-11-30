var Agency = require('../models/agency');

module.exports = function ( body ) {
	var agency = new Agency( body );

	return agency.save();
};