var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');

var app       = express();
var parseForm = bodyParser.urlencoded( { extended: true } );

app.use( bodyParser.json() );
app.use( parseForm );
app.use( cors() );

require( './routes' )( app );

app.listen( process.env.PORT || 5000, function() {
	console.log( 'listening on', process.env.PORT || 5000 );
} );