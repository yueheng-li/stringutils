;
(function($, window, document, undefined) {

	var default_format = {yyyymmdd : 'yyyy/MM/dd',
						  yyyymmddhhmmssS : 'yyyy-MM-dd hh:mm:ss,S'};
	var o;
	var year;
	function DateUtil(date , name) {
		o = {
			"M+" : date.getMonth() + 1,                   //month
			"d+" : date.getDate(),                        //day
			"h+" : date.getHours(),                       //hour
			"m+" : date.getMinutes(),                      //min
			"s+" : date.getSeconds(),                     //sec
			"q+" : Math.floor((date.getMonth()+3)/3),     //quarter
			"S"  : date.getMilliseconds()                 //ms
		};
		year = date.getFullYear();
		if (name != null && name.length > 0) {
			this.data_format = default_format[name];
		} else {
			this.data_format = default_format.yyyymmdd;
		}
	}

	DateUtil.prototype = {
		setDate : function (date) {
			o = {
				"M+" : date.getMonth() + 1,                   //month
				"d+" : date.getDate(),                        //day
				"h+" : date.getHours(),                       //hour
				"m+" : date.getMinutes(),                      //min
				"s+" : date.getSeconds(),                     //sec
				"q+" : Math.floor((date.getMonth()+3)/3),     //quarter
				"S"  : date.getMilliseconds()                 //ms
			};
			year = date.getFullYear();
		},

		format : function (fmt, date) {
			if (date != null) {
				this.setDate(date);
			}

			if (fmt == null || fmt.length == 0) {
				fmt = this.data_format;
			}

			// 用于指示在所搜索的字符串中是否存在正则表达式模式对应的匹配。（只查找最多一个匹配）
			if (/(y+)/.test(fmt)) {
				fmt  = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));

				// 循环o的map
				for (var k in o) {
					if (new RegExp("(" + k + ")").test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
					}
				}
			}

			return fmt;
		},

		parseDate : function (str) {
			var time = Date.parse(str);
			return new Date(time);
		}
	}

	$.fn.DateUtils = function (name) {
		return new DateUtil(new Date(), name);
	}

})(jQuery, window, document);