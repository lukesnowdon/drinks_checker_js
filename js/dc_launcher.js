function dcInit(){
	var root = antbits_dc.root
	var __vc
	var self = this
	var filesloaded = 0
	var filestotal = 0
	this.loadjscssfile = function(filename, filetype){
		filename = filename+"?nocache="+Math.random()
		if (filetype=="js"){
			filestotal++
			$.getScript(filename, function() {
				self.preload()
			});
		}
		else if (filetype=="css"){
			$("head").append("<link>");
			var css = $("head").children(":last");
			css.attr({
				  rel:  "stylesheet",
				  type: "text/css",
				  href: filename
			});
		}
		if (typeof fileref!="undefined"){
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
	}
	if(navigator.userAgent.match(/iPad|(?!.*mobile).*Android*/i) ? true : false){
		loadjscssfile(root+"css/c4l_dc_main.css", "css")
		loadjscssfile(root+"css/stylish-select.css", "css")
		loadjscssfile(root+"js/jquery-1.8.1.min.js", "js")
		loadjscssfile(root+"js/jquery.cookie.js", "js")
		loadjscssfile(root+"js/jquery-ui.min.js", "js")
		loadjscssfile(root+"js/jquery.stylish-select.js", "js")
		loadjscssfile(root+"js/jquery.json-2.4.min.js", "js")
		loadjscssfile(root+"js/jquery.touchswipe.min.js", "js")
		loadjscssfile(root+"package.php", "js") 
		$.get(root+"assets/layout.html", function(e) {
			str = e.replace(/@root@/g, root);
			$("#antbits_dc").html(str)
			self.preload()
		});
		this.preload = function(){
			filesloaded++
			if(filesloaded >filestotal){
				__vc = new view_controller();
			}
		}
	}else{
		var str = '<iframe src="drinks_checker.html" width="538" height="570" frameborder="0" scrolling="no" ></iframe>'
		$("#antbits_dc").html(str)
	}
}
dcInit();