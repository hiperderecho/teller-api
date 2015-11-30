var config = require('../config');
var thinky = require('thinky')(config.rethinkdb);

var r    = thinky.r;
var type = thinky.type;

module.exports = { thinky: thinky, r: r, type: type };