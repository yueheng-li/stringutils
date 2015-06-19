$(document).ready(function() {

    console.log("------------------------main.js is start------------------------");
    var stringUtils = $().StringUtils();
    var dateutils = $().DateUtils();
    /*var str = " ";
    console.log(stringUtils.isEmpty(str));
    console.log(stringUtils.isBlank(str));

    var str1 = "Hello world, welcome to the my blog.";
    console.log("indexOf : " + str1.indexOf("l", 12));
    console.log("indexOf : " + str1.indexOf("world"));
	console.log("----- strip start ----------");
	console.log(stringUtils.stripStart("abc", null));
	console.log(stringUtils.stripStart("  abc", null));
	console.log(stringUtils.stripStart(" abc ", null));
	console.log(stringUtils.stripStart("yxabc  ", "xyz"));
	console.log("----- strip end ----------");
	console.log(stringUtils.stripEnd("abc", null));
	console.log(stringUtils.stripEnd("  abc", null));
	console.log(stringUtils.stripEnd(" abc ", null));
	console.log(stringUtils.stripEnd("yxabcyx", "xyz"));
	console.log(stringUtils.stripEnd("120.00", ".0"));
	console.log("----- strip ----------");
	console.log(stringUtils.strip("yxabcyx", "xyz"));
	console.log("----- containsAny ----------");
	console.log("containsAny : " + stringUtils.containsAny("yxabcyx", ['x', 'y']));
	console.log("containsAny : " + stringUtils.containsAny("yxabcyx", ['x', 'c']));
	console.log("containsAny : " + stringUtils.containsAny("yxabcyx", ['x', 'z']));


	console.log("----- containsAny ----------");
	console.log("containsAny : " + stringUtils.containsAny("yxabcyx", "abxy"));
	console.log("containsAny : " + stringUtils.containsAny("yxabcyx", "abz"));
	console.log("----- split ----------");
	console.log("split : " + stringUtils.splitWorker("yxa bcyx", " "));
	console.log("----- repeat ----------");
	console.log("split : " + stringUtils.repeat("a", 3));
	console.log("split : " + stringUtils.repeat("ab", 3));

	console.log("----- leftPad ----------");
	console.log("leftPad : " + stringUtils.leftPad("", 3, "z") );
	console.log("leftPad : " + stringUtils.leftPad("bat", 3, "yz"));
	console.log("leftPad : " + stringUtils.leftPad("bat", 8, "yz"));
	console.log("leftPad : " + stringUtils.leftPad("bat", 1, "yz"));
	console.log("leftPad : " + stringUtils.leftPad("bat", -1, "yz"));
	console.log("leftPad : " + stringUtils.leftPad("bat", 5, null));
	console.log("leftPad : " + stringUtils.leftPad("bat", 5, ""));
	console.log("----- rightPad ----------");
	console.log("rightPad : " + stringUtils.rightPad("", 3, "z") );
	console.log("rightPad : " + stringUtils.rightPad("bat", 3, "yz"));
	console.log("rightPad : " + stringUtils.rightPad("bat", 8, "yz"));
	console.log("rightPad : " + stringUtils.rightPad("bat", 1, "yz"));
	console.log("rightPad : " + stringUtils.rightPad("bat", -1, "yz"));
	console.log("rightPad : " + stringUtils.rightPad("bat", 5, null));
	console.log("rightPad : " + stringUtils.rightPad("bat", 5, ""));
	*/
	console.log("----- format ----------");
//	console.log("format : " + stringUtils.format('Your balance is {1} USD', 77.7) );
//	console.log("format : " + stringUtils.formatByJson("Hello {name}"	, { name: 'World' }) );


	console.log("date : " + dateutils.format("yyyyMMdd"));


    console.log("------------------------main.js is end------------------------");

});

