;
(function($, window, document, undefined) {
    var pluginName = "demo",
        defaults = {
            target: 'img', //the element that the overlay will attach to
            title: 'title', //the caption that will display when hover
            duration: 'fast', //specify how long the animation will lasts in milliseconds
            fontColor: '#fff',
            textAlign: 'center', //display the caption left, center or right
            verticalMiddle: true, //display the caption vertical middle or not
            backgroundColor: 'rgba(0,0,0,.7)', //specify the background color and opacity using rgba
            reverse: false, //reverse the direction
            height: '100%', //specify the height of the overlay
            withLink: true //if image is wraped with a link the overlay will be clickable, set false to disable click
        };

	 // Construct
	 function Demo(element, options) {
        this.element = element;
        this.setting = $.extend({} , defaults, options);
        //this.init();
	 }

	 // class method define
	 Demo.prototype = {
	 	init : function() {
	 		var title = this.setting.title;
	 		
            var that = this,
                target = this.setting.target;

	 		//create the overlay container each time the mouse enters
            $(this.element).off('mouseenter.sliphover', target).on('mouseenter.sliphover', target, function(event) {
                //fix #9 https://github.com/wayou/SlipHover/issues/9
                //use this instead of event.target for sometimes the event.target is not retriving the right target we want
                //http://stackoverflow.com/questions/9838137/event-target-jquery-on-mousedown-up-is-not-giving-the-dom-specified-by-selecto
	 		    var content = $(this).attr(title);
                console.log("init is start . print is title : " + content);
            });
	 	},

        toString : function() {
            console.log("----------------------------toString is start--------------------");
        }
	 }

    $.fn.demo = function(options) {
    	/*this.each(function() {
    		//console.log(this.attr("title"));
            new Demo(this, options);
    	});*/

        // chain jQuery functions
        return new Demo(this, options);//this;
    }
}
)(jQuery, window, document);

 $(document).ready(function() {
    console.log("----------------------------------");

    var demo = $().demo();
    demo.toString();
/*	
$('.demo').demo();
	$("p").mouseenter(function(){
  $("p").css("background-color","yellow");
});*/
});
