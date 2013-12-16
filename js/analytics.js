function analyticsObj(vc,host,project){
	var self = this
	self.__vc = vc
	self.__project = project
	self.__host = host
	self.__uid= ''
	/*
	this.init = function(){
		if($.cookie(self.__project+"_uid") != null && $.cookie(self.__project+"_uid") != 'test'){
			self.__uid = $.cookie(self.__project+"_uid");
		}else{
			self.__uid = self.generateUUID()
			$.cookie(self.__project+"_uid", self.__uid);
			
		}
		self.logEvent('load','','','')
		//console.log(self.__uid)
	}
	this.generateUUID = function(){
		//return 'test'
		return (Math.random()*Math.pow(36,4) << 0).toString(36)+new Date().getTime().toString(36).substr(-8)
	}
	this.logEvent = function(action,value,label,category){
		var data = 'uuid='+self.__uid+'&action='+action+'&value='+value+'&label='+label+'&category='+category+'&callback='
		//console.log(data)
		$.ajax({
		  url: self.__host,
		  dataType:"jsonp",
		  data: data
		})
	}*/
}
