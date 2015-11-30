var thinky = require('../orm').thinky;
var r      = require('../orm').r;
var type   = require('../orm').type;
var Question = require('./question');

var Agency = thinky.createModel('agencies',
{ id         : type.string()
, name       : type.string().required()
, email      : type.string().email().required()
, quality    : type.string()
, createdAt  : type.date().default( r.now() )
}
);

Agency.ensureIndex('createdAt');

Agency.hasMany( Question, 'questions', 'id', 'agencyId' )

module.exports = Agency;