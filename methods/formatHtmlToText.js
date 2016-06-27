var htmlToText = require('html-to-text');

module.exports = function ( html ) {

	return htmlToText.fromString( html, { hideLinkHrefIfSameAsText: true
	                                    , preserveNewlines        : true
	                                    } );
};