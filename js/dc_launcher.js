function dcInit(){
	var root = antbits_dc.root
	var __vc
	var self = this
	var filesloaded = 0
	this.loadjscssfile = function(filename, filetype){
		filename = filename+"?nocache="+Math.random()
		if (filetype=="js"){
			/*var fileref=document.createElement('script')
			fileref.setAttribute("type","text/javascript")
			fileref.setAttribute("src", filename)*/
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
	loadjscssfile(root+"css/c4l_dc_main.css", "css")
	loadjscssfile(root+"css/stylish-select.css", "css")
	
	
	
	//loadjscssfile(root+"js/jquery-1.8.1.min.js", "js")
	loadjscssfile(root+"js/jquery.touchswipe.min.js", "js")
	loadjscssfile(root+"js/jquery-ui.min.js", "js")
	loadjscssfile(root+"package.php", "js") 
    $("#antbits_dc").load("assets/layout.html",function(){
		self.preload()
		
	});  
	this.preload = function(){
		filesloaded++
		if(filesloaded >4){
			__vc = new view_controller();
		}
		//
	}
     
	
}
dcInit();