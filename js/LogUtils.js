;
(function(global, undefined) {

    var LogLevel = {
        ERROR: 'ERROR',
        WARN: 'WARN',
        INFO: 'INFO',
        DEBUG : 'DEBUG'
    };

	var LEVEL_INFO = "INFO",
	    LEVEL_DEBUG = "DEBUG"
	    LEVEL_ERROR = "ERROR";
	var TYPES = {con : 'console',
                 doc : 'document',
                 alt : 'alert'};

    var WHITE_SPACE = " "; 
    var COLON = " : "; 
    var defaults = {
    	level : LEVEL_DEBUG,
    	type : TYPES.con
    };
    var config = {DOMAppender : {fontSize: '9pt'}};


    function LogUtils(options) {
        this.settings = $.extend({}, defaults, options);
        this.stringUtils = $().StringUtils();
        this.dateutils = $().DateUtils('yyyymmddhhmmssS');
        this.init(config);
    }

    // checkbox を押すと、checkbox対応のcss styleを追加
    function addClass (el, className) {
        var classes = el.className.split(' '),
        classIdx = classes.indexOf(className);
        if (classIdx == -1) {
            classes.push(className);
            el.className = classes.join(' ');
        }
    }

    // checkbox を押すと、checkbox対応のcss styleを削除
    function removeClass(el, className) {
        var classes = el.className.split(' '),
        classIdx = classes.indexOf(className);
        if (classIdx != -1) {
            classes.splice(classIdx, 1);
            el.className = classes.join(' ');
        }
    }

    function scrub (text) {
        return text.replace(/ /g, '&nbsp;').replace('>', '&gt;').replace('<', '&lt;').replace(/\n/g, '<br/>');
    }

    LogUtils.prototype = {
    	init : function(config) {
    		/*console.log(">>>>" + this.settings.level);
    		console.log(">>>>" + this.settings.type);
    		var dateutils = $().DateUtils('yyyymmddhhmmssS');
    		console.log("log : " + dateutils.format());*/
            //this.consoleLog("test");
            //this.writeLog("hello world!!", "dfsafdasf");
           // this.alertLog("hello world!!");
            this.config = {
                font : this.configOpt('font' , config, '"Lucida Console", "Courier New", sans-serif'),
                fontSize : this.configOpt('fontSize', config, '10pt'),
                maxLogs : this.configOpt('maxLogs', config, 200) 
            };

            this.lines = [];

            // msg show conent div
            var logger = this.domEL('div', '_logger', {
                position : 'fixed', bottom : '0',
                height : '250px', left : '0',
                right  : '0', backgroundColor : '#999'
            });
            logger.id = 'LoggerConsole';

            // hide show button add
            var hideBtn = this.domEL('input', '', {
                    position : 'absolute', top : '5px', right : '5px'
                }, {
                    type : 'button', value : 'hide'
            });
            hideBtn.onclick = function() {
                if (this.value === 'hide') {
                    logger.style.height = '30px';
                    this.value = 'show';
                } else {
                    logger.style.height = '250px';
                    this.value = 'hide';
                }
            };
            // add btn in div content
            logger.appendChild(hideBtn);

            // add info checkbox btn in div content
            var infochk = this.domEL('input', '', 
                {position : 'absolute', top : '5px', left : '5px'}, 
                {type : 'checkbox'}
            );
            infochk.checked = true;
            infochk.onchange = function () {
                var loggerConsole = global.document.querySelector('#LoggerConsole');
                if (!this.checked) {
                    addClass(loggerConsole, 'infoHide');
                } else {
                    removeClass(loggerConsole, 'warnHide');
                }
            };
            logger.appendChild(infochk);
            var infoLabel = this.domEL('div', '', {position : 'absolute', top : '5px', left : '25px'});
            infoLabel.innerHTML = 'Information';
            logger.appendChild(infoLabel);

            // add warn checkbox btn in div content
            var warnchk = this.domEL('input', '',
                {position : 'absolute', top : '5px', left : '105px'},
                {type : 'checkbox'}
            );
            warnchk.checked = true;
            warnchk.onchange = function () {
                var loggerConsole = global.document.querySelector('#LoggerConsole');
                if (!this.checked) {
                    addClass(loggerConsole, 'warnHide');
                } else {
                    removeClass(loggerConsole, 'warnHide');
                }
            };

            logger.appendChild(warnchk);
            var warnLabel = this.domEL('div', '', {position : 'absolute', top : '5px', left : '125px'});
            warnLabel.innerHTML = 'Waring';
            logger.appendChild(warnLabel);

            // add error checkbox btn in div content
            var errorchk = this.domEL('input', '',
                {position : 'absolute', top : '5px', left : '185px'},
                {type : 'checkbox'}
            );
            errorchk.checked = true;
            errorchk.onchange = function () {
                var loggerConsole = global.document.querySelector('#LoggerConsole');
                if (!this.checked) {
                    addClass(loggerConsole, 'errorHide');
                } else {
                    removeClass(loggerConsole, 'errorHide');
                }
            };
            logger.appendChild(errorchk);
            var errorLabel = this.domEL('div', '', {position : 'absolute', top : '5px', left : '205px'});
            errorLabel.innerHTML = 'Error';
            logger.appendChild(errorLabel);

            // add debug checkbox btn in div content
            var debugchk = this.domEL('input', '',
                {position : 'absolute', top : '5px', left : '245px'},
                {type : 'checkbox'}
            );
            debugchk.checked = true;
            debugchk.onchange = function () {
                var loggerConsole = global.document.querySelector('#LoggerConsole');
                if (!this.checked) {
                    addClass(loggerConsole, 'debugHide');
                } else {
                    removeClass(loggerConsole, 'debugHide');
                }
            };
            logger.appendChild(debugchk);
            var debugLabel = this.domEL('div', '', {position : 'absolute', top : '5px', left : '265px'});
            debugLabel.innerHTML = 'Debug';
            logger.appendChild(debugLabel);

            // message div
            var logDiv = this.domEL('div', '',
                    {overflow : 'auto', position : 'absolute',
                     top : '30px', left : '5px',
                     right : '5px', bottom : '5px',
                     border : '1px solid white', backgroundColor : '#333',
                     fontFamily : this.config.font, fontSize : this.config.fontSize
                    }
                );
            logger.appendChild(logDiv);
            this.logDiv = logDiv;

            // add css style 
            var styles = global.document.createElement('style');
            styles.setAttribute('type', 'text/css');
            styles.innerHTML = '._logger a { color: #aaf; } ._logger a:visited { color: #88f; } ' +
                '._logger div.error { color: red; } ._logger div.warning { color: yellow; } ' +
                '._logger div.info { color: white; } ._logger div.debug {color : blue}' +
                '#LoggerConsole.infoHide div.info { display: none; } ' +
                '#LoggerConsole.warnHide div.warning { display: none; } ' +
                '#LoggerConsole.debugHide div.debug { display: none; } ' +
                '#LoggerConsole.errorHide div.error { display: none; } ';

            global.document.getElementsByTagName("head")[0].appendChild(styles);

            // add body lis
           // global.document.addEventListener('DOMContentLoaded', function() {
                global.document.body.appendChild(logger);
           // });
    	},

        domEL : function (type, className, styles, attributes) {
            var el = global.document.createElement(type);
            el.className = className || '';
            styles = styles || {};
            attributes = attributes || {};

            for (var style in styles) {
                if (styles.hasOwnProperty(style)) {
                    el.style[style] = styles[style];
                }
            };

            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    el.setAttribute(attribute, attributes[attribute]);
                }
            };


            return el;
        },
        log : function (type, message, url, lineNumber) {
            var now = this.getNowDate();
            if (message instanceof Error) {
                if (message.stack) {
                    message = (message.message && message.stack.indexOf(message.message) === -1) ?
                        message.message + "\n" + message.stack : message.stack;
                } else if (message.sourceURL) {
                    message = message.message;
                    url = message.sourceURL;
                    lineNumber = message.line;
                }
            }
            var classStr;
            switch (type) {
                case LogLevel.ERROR : classStr = 'error'; break;
                case LogLevel.DEBUG : classStr = 'debug'; break;
                case LogLevel.WARN  : classStr = 'warning'; break;
                case LogLevel.INFO  : classStr = 'info'; break;
            };


            var text = now + WHITE_SPACE + this.stringUtils.rightPad(type, 6)
                + scrub(message) +
                (url !== undefined ? ' (<a href="' + url + '" target="_blank">' + url + '</a>) ' : '') +
                (lineNumber !== undefined ? '@ ' + lineNumber : '');
            this.logLine(classStr, text);

        },
        logLine : function (stylesClass, text) {
            var logLine = this.domEL('div', stylesClass);
            logLine.innerHTML = text;
            this.logDiv.appendChild(logLine);
            this.lines.push(logLine);

            if (this.lines.length > this.config.maxLogs) {
                this.logDiv.removeChild(this.lines.shift());
            }
        },

        // --------------------------------------------------------------------------------------------------

        error : function(message, url, lineNumber) {
            this.log(LogLevel.ERROR, message, url, lineNumber);
        },

        debug : function (message, url, lineNumber) {
            this.log(LogLevel.DEBUG, message, url, lineNumber);
        },

        warn : function(message, url, lineNumber) {
            this.log(LogLevel.WARN, message, url, lineNumber);
        },

        info : function(message, url, lineNumber) {
            this.log(LogLevel.INFO, message, url, lineNumber);
        },

        // --------------------------------------------------------------------------------------------------

        configOpt : function (key, config, optValue) {
            return (config[this.name] && config[this.name][key]) || optValue;
        },

        // now date get
        getNowDate : function () {
            return this.dateutils.format();
        },

        // 2015-1-02 10:23:35,165 INFO
        startLine : function() {
            return this.getNowDate() + WHITE_SPACE + this.stringUtils.rightPad(this.settings.level, 6) + COLON;
        },

        consoleLog : function () {
         //   console.log("?>>" + arguments[0]);
            console.log(this.startLine() + this.logEdit(arguments));
        },

        writeLog : function () {
            document.writeln(this.startLine() + this.logEdit(arguments));
        },

        alertLog : function () {
            alert(this.startLine() + this.logEdit(arguments));
        },

        logEdit : function (msgs) {
            var edit = "";
            for (var i = 0; i < msgs.length; i++) {
                edit = edit + msgs[i] + WHITE_SPACE
            };
         //   console.log("?>>" + msgs[0]);
            return edit;
        }
    };
    LogUtils.prototype.name = 'DOMAppender';

	$.fn.LogUtils = function (options) {
		return new LogUtils(options);
	}

    // Exports
    // -------

    // AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return LogUtils;
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = LogUtils;
    }
    // Script tag
    else {
        ;
        global.LogUtils = LogUtils;
    }
}
)(this);