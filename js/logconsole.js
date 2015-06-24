;
(function(global, undefined) {

	function configOpt (key, config, optValue) {
        return (config[this.name] && config[this.name][key]) || optValue;
    }

	var DOMAppender = function (config) {
		this.config = {
			font : configOpt('font' , config, '"Lucida Console", "Courier New", sans-serif'),
			fontSize : configOpt('fontSize', config, '10pt'),
			maxLogs : configOpt('maxLogs', config, 200) 
		};

		

	}
})(this);