var session = require('express-session');
var express = require('express');

module.exports = function ( app ) {

	app.use( session( {resave: true, saveUninitialized: true, secret: 'supersecret', cookie: { maxAge: 60000 }}));

	app.get ('/admin'                               , require('./onAdminGetRequest') );
	app.get ('/admin/agencias'                      , require('./onAdminAgenciesGetRequest') );
	app.get ('/admin/preguntas/:questionId'         , require('./onAdminQuestionGetRequest') );
	app.get ('/admin/crear-agencia'                 , require('./onAdminCreateAgencyGetRequest') );
	app.post('/admin/create-agency'                 , require('./onAdminCreateAgencyPostRequest') );
	app.get ('/admin/agencias/:agencyId/:agencyName', require('./onAdminAgencyGetRequest') );
	app.get ('/signOut'                             , require('./onAdminSignOutGetRequest') );
	app.post('/signIn'                              , require('./onAdminSignInPostRequest') );
	app.post('/admin/updateQuestion/:questionId'    , require('./onAdminUpdateQuestionPostRequest') );
	app.post('/admin/updateAgency/:agencyId'        , require('./onAdminUpdateAgencyPostRequest') );
	app.post('/admin/deleteAgency/:agencyId'        , require('./onAdminDeleteAgencyPostRequest') );
	app.post('/admin/runStatusChecker'              , require('./onAdminRunStatusCheckerPostRequest') );
};