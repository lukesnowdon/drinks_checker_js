function maintain_state(vc){
	var self = this
	var init = false
	this.__vc = vc
	this.storeState = function(){	
		if(init){	
			var output = '{"gender":'+self.__vc.__results.__gender+',"drinks":  '+JSON.stringify(self.__vc.__drinks)+',"page": '+self.__vc.__page+',"form_hidden": '+self.__vc.__form_hidden+'}'
			$.cookie("c4l_drinks_checker",output);
		}
	}
	this.clearState = function (){
		//$.removeCookie("c4l_drinks_checker");
		init = true
	}
	this.restoreState = function(){
		var result = false;
		if($.cookie("c4l_drinks_checker") != null){
			var tmp = jQuery.parseJSON($.cookie("c4l_drinks_checker"))
			console.log(tmp)
			self.__vc.restoreState(tmp)
			
		}
		self.clearState();
	}
}