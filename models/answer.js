var thinky = require('../orm').thinky;
var r      = require('../orm').r;
var type   = require('../orm').type;

var Answer = thinky.createModel('answers',
{ id         : type.string()
, questionId : type.string()
, content    : type.string().required()
, author     : type.string().email()
, attachment : type.string()
, createdAt  : type.date().default( r.now() )
}
);

Answer.ensureIndex('createdAt');

module.exports = Answer;