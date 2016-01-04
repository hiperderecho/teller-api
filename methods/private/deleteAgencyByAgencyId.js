var Agency = require('../../models/agency');

module.exports = function ( agencyId ) {

	return Agency.get( agencyId ).delete();
};