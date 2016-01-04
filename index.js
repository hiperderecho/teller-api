var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var compression = require('compression');
require('console-stamp')(console);

var app       = express();
var parseForm = bodyParser.urlencoded( { extended: true } );

app.use( bodyParser.json() );
// app.use( bodyParser.urlencoded({extended: true}) );
app.use( parseForm );
app.use( cors() );
app.use( compression() );
app.use( express.static( __dirname + '/public' ) );

app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/views' );

require( './routes' )( app );
require( './schedule' );

app.listen( process.env.PORT || 5000, function() {
	console.log( 'listening on', process.env.PORT || 5000 );
} );