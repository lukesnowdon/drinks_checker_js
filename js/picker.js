function picker(p,target,d,cb){
	var self = this;
	var callback = cb
	var id = target.attr('id')
	var $inner,$children,item_w,item_h,slide_max,data,selected_key,emphasis_key,inc,origin,pos,diff;
	self.__selected
	self.__parent = p;
	data = d
	if(data.aspect == 'h'){
		item_w = Math.min(data.width,data.height)
		if(data.format == 'currency'){
			item_w*=2
		}
		inc = item_w
	}else{
		item_w = data.width-20
		inc = Math.min(item_w,data.height)
	}
	item_h = Math.min(data.width,data.height) 
	var $target = target;
	this.update = function(d){
		if(d.series.length>0 && (d.series.toString() != data.series.toString() || d.emphasis != data.emphasis)){
			data = d
			$inner.fadeOut(500,function(){
				$target.html('')
				self.init()
			})
		}
	}
	this.init = function(){
		slide_max = data.series.length*item_w
		var str = '<div>'
		for(var key in data.series){
			str+='<div id="picker_'+id+'_'+key+'"'
			if(data.series[key] == data.emphasis){
				emphasis_key = key;
				str+=' class = "picker_emphasis" '
			}
			if(data.series[key] == data.selected){
				selected_key = key;
			}
			if(data.format == 'currency'){
				str+='>£'+data.series[key].toFixed(2)+'</div>'
			}else{
				str+='>'+data.series[key]+'</div>'
			}
			
		}
		if(data.aspect == 'h'){
			str += '</div><div class="picker_overlay_l"></div><div class="picker_overlay_r"></div>'
		}else{
			str += '</div><div class="picker_overlay_t"></div><div class="picker_overlay_b"></div>'
			$target.css('background-image','none')
		}
		$target.html(str)
		$target.css('font-size',(item_h*0.6)+'px')
		$inner = $target.children().first()
		$inner.hide()
		$target.css('width',data.width).css('height',data.height)
		$inner.children().width(item_w)
		$inner.children().height(item_h*0.7)
		$inner.children().css('padding-top',(item_h*0.3)+'px')
		
		if(data.aspect == 'h'){
			$inner.width(slide_max);
			$inner.height(item_h);
			$inner.children().first().css('margin-left',(0-(item_w*0.5))+'px')
			
		}else{
			$inner.height(slide_max);
			$inner.height(item_w);
			$inner.children().first().css('margin-top',(0-(item_h*0.5))+'px')
			
		}
		self.set(0,selected_key)
		$inner.fadeIn(500)
		$target.swipe(
			{
				swipeStatus:function(event, phase, direction, distance, duration, fingers){
					
					event.preventDefault();
					self.swipeTo(direction,distance,phase)
				},threshold:200,maxTimeThreshold:5000,fingers:'all'}
			);
		
		
	}
	self.swipeTo = function(direction,distance,phase){
		var target =  self.__selected
		switch(phase){
			case "start":
				if(data.aspect == 'h'){
					origin = parseInt($inner.css('marginLeft').replace(/px+/g, '')); 
				}else{
					origin = parseInt($inner.css('marginTop').replace(/px+/g, '')); 
				}
			break
			case "end":
				if(data.aspect == 'h' && direction=='left'){
					pos = parseInt($inner.css('marginLeft').replace(/px+/g, ''))-(item_w); 
					diff = (((data.width*0.5)-(item_w *0.5))-pos)
					selected_key = Math.min(Math.round(diff/item_w),data.series.length-1)
				}
				if(data.aspect == 'h' && direction=='right'){
					pos = parseInt($inner.css('marginLeft').replace(/px+/g, ''))+(item_w); 
					diff = (((data.width*0.5)-(item_w *0.5))-pos)
					selected_key = Math.max(Math.round(diff/item_w),0)
				}
				if(data.aspect == 'v' && direction=='up'){
					pos = parseInt($inner.css('marginTop').replace(/px+/g, ''))-(item_h); 
					diff = (((data.height*0.5)-(item_h *0.5))-pos)
					selected_key = Math.min(Math.round(diff/item_h),data.series.length-1)
				}
				if(data.aspect == 'v' && direction=='down'){
					pos = parseInt($inner.css('marginTop').replace(/px+/g, ''))+(item_h); 
					diff = (((data.height*0.5)-(item_h *0.5))-pos)
					selected_key = Math.max(Math.round(diff/item_h),0)
				}
				
				self.set(300,selected_key)
				if(callback){			
					eval(callback)
				}
			break
			default:
				if(direction!= null && data.aspect == 'h'){
					switch(direction){
						case "left":
							$inner.css('marginLeft',origin-distance)
						break;
						case "right":
							$inner.css('marginLeft',origin+distance)
						break;
					}
				}
				if(direction!= null && data.aspect == 'v'){
					switch(direction){
						case "up":
							$inner.css('marginTop',origin-distance)
						break;
						case "down":
							$inner.css('marginTop',origin+distance)
						break;
					}
				}
			break
			//alert(origin)
		}
		
	}
	self.set = function(speed,val){
		self.__selected = val
		//console.log(val)
		//var t = (inc*val)-(val/2)
		//var t = (inc*val)-(val/2)
		var t=0
		if(data.aspect == 'h'){
			t = (data.width/2)-(inc*val)
			$inner.animate({marginLeft: t}, speed,'easeOutQuad',function(){});
		}else{
			t = (data.height/2)-(inc*val)
			$inner.animate({marginTop: t}, speed,'easeOutQuad',function(){});
			
		}
	}
	self.init()
}