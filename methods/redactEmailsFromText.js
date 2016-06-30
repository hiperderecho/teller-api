module.exports = function ( text ) {
	var splittedText = text.replace( /\n/g, " " ).split(' ');
	var emailRule = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	var email;
	var redactedEmail;

	splittedText.forEach( function ( textStrip, index ) {

		if ( emailRule.test( textStrip ) ) {
			email = textStrip.split('@');
			email[0] = Array( email[0].length + 1 || 1 ).join('■');
			email[1] = Array( email[1].length + 1 || 1 ).join('■');
			redactedEmail = email.join('@');
			splittedText[ index ] = redactedEmail;
		}
	} );
	return splittedText.join(' ');
};