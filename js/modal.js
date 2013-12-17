function modal(vc,target){
	var self = this;
	self.__vc = vc
	var $target = target
	var $bg = null
	var $bs = null
	var $bmi_wrapper = $('#bmi_wrapper')
	var $content = null
	this.launch = function(data){
		self.__data = data
		if($.browser.msie){
			var output = '<div id="modal_bg"></div><div id="box_shadow"></div><div id = "modal_container"><div id = "modal_close"><a href="javascript:;">close<img src = "images/close.png" border="0"></a></div><h1>'+data.title+'</h1><p>'+data.body+'</p></div>'
		}else{
			var output = '<div id="modal_bg"></div><div id = "modal_container"><div id = "modal_close"><a href="javascript:;">close<img src = "images/close.png" border="0"></a></div><h1>'+data.title+'</h1><p>'+data.body+'</p></div>'
		}
		
		$target.append(output)
		$bg = $('#modal_bg')
		$content = $('#modal_container')
		if(self.__data.w){
			$content.css('width',self.__data.w+'px')
		}
		if(self.__data.h){
			$content.css('height',self.__data.h+'px')
		}
		$bg.fadeTo(300,0.5)
		$content.fadeIn(300)
		$bg.click(function(){self.quit()})
		$content.css('margin-left',0-($content.width()+40)/2)
		$content.css('margin-top',0-($content.height()+40)/2)
		if($.browser.msie){
			$bs = $('#box_shadow');
			$bs.width($content.width())
			$bs.height($content.height())
			$bs.css('margin-left',0-($content.width()+70)/2)
			$bs.css('margin-top',0-($content.height()+65)/2)
			$bs.fadeIn(300)
		}
		
		if(self.__data.callback){
			eval(self.__data.callback)
		}
		$('#modal_close').click(function(){self.quit()})
		self.lockView()
	}
	this.lockView = function(){
		$('#advice_prev').attr("tabindex", -1);
		$('#advice_next').attr("tabindex", -1);
		$bmi_wrapper.find("a").attr("tabindex", -1);
		$bmi_wrapper.find("input").attr("tabindex", -1);
	}
	this.unlockView = function(){
		$('#advice_prev').attr("tabindex", 0);
		$('#advice_next').attr("tabindex", 0);
		$bmi_wrapper.find("a").attr("tabindex", null);
		$bmi_wrapper.find("input").attr("tabindex", null);
	}
	this.quit = function(){
		self.unlockView()
		$bg.fadeOut(300)
		$content.fadeOut(300,function(){
			$bg.remove()
			$content.remove()
			
		})
		if($.browser.msie){
			$bs.fadeOut(300,function(){
				$bs.remove()
			})
		}
	}
	
	
}