var Agency = require('../../models/agency');

module.exports = function ( agencyId, updateObject ) {

	return Agency.get( agencyId ).update( updateObject );
};