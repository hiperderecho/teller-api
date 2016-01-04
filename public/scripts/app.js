var app = function () {
	var onLoginFormSubmit
	  , onQuestionFormSubmit
	  , onCreateAgencyFormsubmit
	  , onUpdateAgencyFormSubmit
	  , onDeleteAgencyBtnClick
	  , onRunStatusCheckerBtnClick
	  ;

	onCreateAgencyFormsubmit = function ( e ) {
		var data  = {}
		  , $this = $(this)
		  ;

		e.preventDefault();
		data.name  = $('#createAgencyFormName').val();
		data.email = $('#createAgencyFormEmail').val();

		if ( data.name && data.email ) {
			$.post('/admin/create-agency', data )
			.then( function ( result ) {

				if ( result.success ) {
					$this.empty().append('<h4>Agency created</h4><a href="/admin">Go back</a>');
				}
			}, function ( error ) {

				$this.empty().append('<h4>There was an error</h4><pre>' + error.responseText + '</pre>');
			} );
		}
	};

	onLoginFormSubmit = function ( e ) {
		var data = {};

		e.preventDefault();
		data.email    = $('#loginFormEmail').val();
		data.password = $('#loginFormPassword').val();

		$.post('/signIn', data)
		.then( function ( result ) {

			if ( result.success ) {
				window.location.reload();
			}
		}, function ( xhr ) {

			if ( xhr.status === 403 ) {
				$('#login-form-holder').empty().append('<h4>Error on Sign in</h4>');
			}
		} );
	};

	onQuestionFormSubmit = function ( e ) {
		var data  = {}
		  , $this = $(this)
		  ;

		e.preventDefault();
		$.post('/admin/updateQuestion/' + $this.data('question-id'), $this.serialize() )
		.then( function ( result ) {

			if ( result.success ) {
				$this.empty().append('<h4>Question updated</h4><a href="/admin">Go back</a>');
			}
		}, function ( error ) {

			$this.empty().append('<h4>There was an error</h4><pre>' + error.responseText + '</pre>');
		} );
	};

	onUpdateAgencyFormSubmit = function ( e ) {
		var data = {}
		  , $this = $(this)
		  ;

		e.preventDefault();
		$.post('/admin/updateAgency/' + $this.data('agency-id'), $this.serialize() )
		.then( function ( result ) {

			if ( result.success ) {
				$this.empty().append('<h4>Agency updated</h4><a href="/admin">Go back</a>');
			}
		}, function ( error ) {

			$this.empty().append('<h4>There was an error</h4><pre>' + error.responseText + '</pre>');
		} );
	};

	onDeleteAgencyBtnClick = function () {
		var $this = $(this);

		$.post('/admin/deleteAgency/' + $('#updateAgencyForm').data('agency-id') )
		.then( function ( result ) {

			window.location.href = '/admin';
		}, function ( error ) {

			window.location.href = '/admin';
		} );
	};

	onRunStatusCheckerBtnClick = function () {
		var $this = $(this);

		$.post('/admin/runStatusChecker')
		.then( function ( result ) {

			if ( result.success ) {
				$this.parent().prepend('<p>Status Checker done</p>').end().remove();
			}
			if ( !result.success ) {
				$this.parent().prepend('<p>Unknown error</p>').end().remove();
			}
		}, function ( error ) {

			$this.parent().prepend('<p>There was an error</p>').end().remove();
		} );
	};

	$('#loginForm')                   .on('submit', onLoginFormSubmit );
	$('#questionForm')                .on('submit', onQuestionFormSubmit );
	$('#createAgencyForm')            .on('submit', onCreateAgencyFormsubmit );
	$('#updateAgencyForm')            .on('submit', onUpdateAgencyFormSubmit );
	$('button.js-deleteAgencyBtn')    .one('click', onDeleteAgencyBtnClick );
	$('button.js-runStatusCheckerBtn').one('click', onRunStatusCheckerBtnClick );
};

$( app );