var Agency = require('../models/agency');

module.exports = function () {

	return Agency.orderBy({ index: 'createdAt' }).run();
};