module.exports = ( function () {
	var accentMap = ( function ( letters ) {
		var map = {};

		while(letters.length>0) {
			var letter = "[" + letters.shift() + "]";
			var chars  = letter.split('');

			while(chars.length>0) {
				map[chars.shift()] = letter;
			}
		}

		return map;

	})([
		'aàáâãäå', // a
		'cç',      // c
		'eèéêë',   // e
		'iìíîï',   // i
		'nñ',      // n
		'oòóôõöø', // o
		'sß',      // s
		'uùúûü',   // u
		'yÿ'       // y
	]);

	return function (text) {
		var textFold = '';

		if (!text) {
			return textFold;
		}
		text = text.toLowerCase();
		for (var idx = 0; idx < text.length; idx++) {
			var charAt = text.charAt(idx);

			textFold += accentMap[charAt] || charAt;
		}
		return "(?i)" + textFold;
	}

})();