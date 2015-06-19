;
(function($, window, document, undefined) {

    var INDEX_NOT_FOUND = -1;

	function StringUtils() {

	}

	StringUtils.prototype = {

		isEmpty : function (strObj) {
			return !strObj || strObj.length == 0;

		},

		isBlank : function (strObj) {
			return !strObj || $.trim(strObj).length == 0;
		},

		strip : function (str, stripChars) {
			if (this.isEmpty(str)) {
				return str;
			}
			str = this.stripStart(str, stripChars);
			return this.stripEnd(str, stripChars);
		},

　　　　　 /**
　　　　　   * <p>Strips any of a set of characters from the start of a String.</p>
　　　　　   *
　　　　　   * <pre>
　　　　　   * StringUtils.stripStart(null, *)          = null
　　　　　   * StringUtils.stripStart("", *)            = ""
　　　　　   * StringUtils.stripStart("abc", "")        = "abc"
　　　　　   * StringUtils.stripStart("abc", null)      = "abc"
　　　　　   * StringUtils.stripStart("  abc", null)    = "abc"
　　　　　   * StringUtils.stripStart("abc  ", null)    = "abc  "
　　　　　   * StringUtils.stripStart(" abc ", null)    = "abc "
　　　　　   * StringUtils.stripStart("yxabc  ", "xyz") = "abc  "
　　　　　   * </pre>
　　　　　   *
　　　　　   * @param str  the String to remove characters from, may be null
　　　　　   * @param stripChars  the characters to remove, null treated as whitespace
　　　　　   * @return the stripped String, if null String input
　　　　　   */
		stripStart : function (str, stripChars) {
			var strLen;
			if (str == null || (strLen = str.length) == 0) {
				return str;
			}
			var start = 0;
			if (stripChars == null) {
				while (start != strLen && this.isBlank(str.charAt(start)) ) {
					start ++;
				}
			} else if (this.isEmpty(stripChars)) {
				return str;
			} else {
				while (start != strLen && stripChars.indexOf(str.charAt(start)) != INDEX_NOT_FOUND) {
					start ++;
				}
			}
			return str.substr(start);
		},

	    /**
	     * <p>Strips any of a set of characters from the end of a String.</p>
	     *
	     * <pre>
	     * StringUtils.stripEnd(null, *)          = null
	     * StringUtils.stripEnd("", *)            = ""
	     * StringUtils.stripEnd("abc", "")        = "abc"
	     * StringUtils.stripEnd("abc", null)      = "abc"
	     * StringUtils.stripEnd("  abc", null)    = "  abc"
	     * StringUtils.stripEnd("abc  ", null)    = "abc"
	     * StringUtils.stripEnd(" abc ", null)    = " abc"
	     * StringUtils.stripEnd("  abcyx", "xyz") = "  abc"
	     * StringUtils.stripEnd("120.00", ".0")   = "12"
	     * </pre>
	     *
	     * @param str  the String to remove characters from, may be null
	     * @param stripChars  the set of characters to remove, null treated as whitespace
	     * @return the stripped String, if null String input
	     */
		stripEnd : function (str, stripChars) {
			var end;
			if (str == null || (end = str.length) == 0) {
				return str;
			}

			if (stripChars == null) {
				while (end != 0 && this.isBlank(str.charAt(end - 1))) {
					end --;
				}
			} else if (this.isEmpty(stripChars)) {
				return str;

			} else {
				while (end != 0 && stripChars.indexOf(str.charAt(end - 1)) != INDEX_NOT_FOUND) {
					end --;
				}
			}

			return str.substring(0, end);
		},

		containsAnyByArray : function (str, searchChars) {
			if (this.isEmpty(str)) {
				return false;
			}
			var strLen = str.length;
			var serarchLen = searchChars.length;
			var strlast = strLen - 1;
			var serarchLast = serarchLen - 1;
			for (var i = 0; i < strLen; i++) {
				var ch = str.charAt(i);
				for (var j = 0; j < serarchLen; j++) {
					if (searchChars[j] == ch) {
						if (j == serarchLast) {
							return true;
						}
					}
				};
			};
			return false;
		},

		containsAny : function (str, searchStrs) {
			return this.containsAnyByArray(str, this.toArray(searchStrs));
		},

		toArray : function (str) {
			var strLen;
		    var newArray = new Array()
			if (str == null || (strLen = str.length) == 0) {
				return newArray;
			}
			var newArray = [];
			for (var i = 0; i < strLen; i++) {
				newArray[i] = str.charAt(i);
			}
			return newArray;
		},

		splitWorker : function (str, separatorChar) {
			if (str == null) {
				return null;
			}
			var splitArray = new Array();
			var len = str.length;
			if (len == 0) {
				return splitArray;
			}

			var i = 0, start = 0, j = 0;
			while (i < len) {
				if (str.charAt(i) == separatorChar) {
					splitArray[j] = str.substring(start, i);
					//console.log(">>" + str.substring(start, i));
					//console.log(">>" + start + "," + i);
					start = ++i;
					j++;
					continue;
				}
				i++;
			}
			splitArray[j] = str.substring(start, i);
			return splitArray;
		},

	    /**
	     * <p>Repeat a String times to form a
	     * new String.</p>
	     *
	     * <pre>
	     * StringUtils.repeat("a", 3)  = "aaa"
	     * StringUtils.repeat("ab", 2) = "abab"
	     * </pre>
	     *
	     */
		repeat : function (str, repeat) {
			if (str == null) {
				return null;
			}

			if (repeat <= 0) {
				return "";
			}

			var inputLength = str.length;
			if (repeat == 1 || inputLength == 0) {
				return str;
			}
			var buf = "";
			for (var i = 0; i < repeat; i++) {
				buf = buf + str;
			}
			return buf;
		},
	    /**
	     * <p>Left pad a String with a specified String.</p>
	     *
	     * <pre>
	     * StringUtils.leftPad(null, *, *)      = null
	     * StringUtils.leftPad("", 3, "z")      = "zzz"
	     * StringUtils.leftPad("bat", 3, "yz")  = "bat"
	     * StringUtils.leftPad("bat", 5, "yz")  = "yzbat"
	     * StringUtils.leftPad("bat", 8, "yz")  = "yzyzybat"
	     * StringUtils.leftPad("bat", 1, "yz")  = "bat"
	     * StringUtils.leftPad("bat", -1, "yz") = "bat"
	     * StringUtils.leftPad("bat", 5, null)  = "  bat"
	     * StringUtils.leftPad("bat", 5, "")    = "  bat"
	     * </pre>
	     *
	     * @param str  the String to pad out, may be null
	     * @param size  the size to pad to
	     * @param padStr  the String to pad with, null or empty treated as single space
	     * @return left padded String or original String if no padding is necessary,
	     *  if null String input
	     */
		leftPad : function(str, size, padStr) {
			if (str == null) {
				return null;
			}

			if (padStr == null || padStr.length == 0) {
				padStr = " ";
			}

			var padLen = padStr.length;
			var strLen = str.length;
			var pads = size - strLen;

			if (pads <= 0) {
				return str;
			}

			if (pads == padLen) {
				return padStr + str;
			} else if (pads < padLen) {
				return padStr.substring(0, pads) + str;
			} else {
				var newStr = "";
				var padChars = this.toArray(padStr);
				for (var i = 0; i < pads; i++) {
					//console.log("" + (i % padLen));
					newStr = newStr + padChars[i % padLen];
				}
				return newStr + str;
			}
		},

		leftPadBySpace : function(str, size) {
			return this.leftPad(str, size, " ");
		},

	    /**
	     * <p>Right pad a String with a specified String.</p>
	     * <pre>
	     * StringUtils.rightPad(null, *, *)      = null
	     * StringUtils.rightPad("", 3, "z")      = "zzz"
	     * StringUtils.rightPad("bat", 3, "yz")  = "bat"
	     * StringUtils.rightPad("bat", 5, "yz")  = "batyz"
	     * StringUtils.rightPad("bat", 8, "yz")  = "batyzyzy"
	     * StringUtils.rightPad("bat", 1, "yz")  = "bat"
	     * StringUtils.rightPad("bat", -1, "yz") = "bat"
	     * StringUtils.rightPad("bat", 5, null)  = "bat  "
	     * StringUtils.rightPad("bat", 5, "")    = "bat  "
	     * </pre>
	     *
	     * @param str  the String to pad out, may be null
	     * @param size  the size to pad to
	     * @param padStr  the String to pad with, null or empty treated as single space
	     * @return right padded String or original String if no padding is necessary,
	     *  if null String input
	     */
		rightPad : function(str, size, padStr) {
			if (str == null) {
				return null;
			}

			if (padStr == null || padStr.length == 0) {
				padStr = " ";
			}

			var padLen = padStr.length;
			var strLen = str.length;
			var pads = size - strLen;

			if (pads <= 0) {
				return str;
			}

			if (pads == padLen) {
				return str + padStr;
			} else if (pads < padLen) {
				return str + padStr.substring(0, pads);
			} else {
				var newStr = "";
				var padChars = this.toArray(padStr);
				for (var i = 0; i < pads; i++) {
					//console.log("" + (i % padLen));
					newStr = newStr + padChars[i % padLen];
				}
				return str + newStr;
			}
		},

		/**
		 * string format
	     * <pre>
	     * StringUtils.format('Your balance is {1} USD', 77.7)      = Your balance is 77.7 USD
	     * </pre>
		 */
		format : function() {
			//console.log(">>" + arguments.length);
			if (arguments.length == 0) {
				return null;
			}

			if (arguments.length == 1) {
				return arguments[0];
			}

			var str = arguments[0];
			for (var i = 1; i < arguments.length; i++) {
				var reg = new RegExp("\\{" + i + "\\}", "gm");
				str = str.replace(reg, arguments[i]);
			};
			return str;
		},

		/**
		 * string format json(param)
	     * <pre>
	     * StringUtils.formatByJson("Hello {name}", 'World')      = Your balance is 77.7 USD
	     * </pre>
		 */
		formatByJson : function(str, arguments) {
			if (this.isEmpty(str)) {
				return str;
			}
			var newStr = str;
			for (var key in arguments) {
				newStr = newStr.replace('{' + key + '}', arguments[key]);
			}
			return newStr;
		}

	}

	$.fn.StringUtils = function () {
		return new StringUtils();
	}

})(jQuery, window, document);