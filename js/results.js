function results(vc){
	var self = this;
	self.__vc = vc
	var $next = $('#result_next')
	var $back = $('#result_back')
	var $man = $('#man')
	var $woman = $('#woman')
	var $units_mid = $('#units_mid')
	var $calories_mid = $('#calories_mid')
	var $units_illo_left = $('#units_illo_left')
	var $units_illo_right = $('#units_illo_right')
	var $units_text = $('#units_text')
	var $units_caption = $('#units_caption')
	var $calories_caption = $('#calories_caption')
	var $calories_foot = $('#calories_foot')
	var $cost_mid = $('#cost_mid')
	var $cost_foot = $('#cost_foot')
	var $pie_chart = $('#pie_chart')
	var $pie_chart = $('#pie_chart')
	var $warning = $('#warning')
	var $do_body = $('#do_body')
	var $means_body = $('#means_body')
	var gender_str = ''
	var audio = true
	var genders = Array('male','female')
	var audio_obj_0 = document.getElementById("audio_obj_0");
	var audio_obj_1 = document.getElementById("audio_obj_1");
	var audio_obj_2 = document.getElementById("audio_obj_2");
	
	this.__r_pages = new Array({'locked':true},{'locked':true},{'locked':true},{'locked':true},{'locked':true},{'locked':true},{'locked':true})
	this.__r_set = {'calories':0,'cost':0,'units':0,'category':0}
	this.__gender = null
	this.init = function(){
		if($.browser.msie && $.browser.version < 9){
			audio = false
		}
		// page 3 setup
		$('#dt_p_3 .result_body_text').html(self.__vc.__data.misc_text.gender_select)
		// page 4 setup
		$('#calories_head').html(self.__vc.__data.misc_text.calories_header)
		// page 5 setup
		// page 6 setup
		// page 7 setup
		/*for(var i = 2;i<self.__vc.__max_pages;i++){
			
		}*/
	}
	this.collate = function(){
		this.__r_set = {'calories':0,'cost':0,'units':0,'category':0}
		var r = self.__vc.__drinks_summary
		for(var i = 0;i<r.length;i++){
			this.__r_set['calories']+=r[i]['calories']
			this.__r_set['cost']+=r[i]['cost']
			this.__r_set['units']+=r[i]['units']
			//console.log(r[i])
		}
		this.__r_set['units'] = this.__r_set['units'].toFixed(1);
		switch(self.__gender){
			case 0:
				if(this.__r_set['units'] <= 4){		
					this.__r_set['category'] = 2;
				}else if(this.__r_set['units'] <= 8 ){ 
					this.__r_set['category'] = 1;
				}else{					   
					this.__r_set['category'] = 0;
				}
			break;
			case 1:
				if(this.__r_set['units'] <= 3){		
					this.__r_set['category'] = 2;
				}else if(this.__r_set['units'] <= 6 ){ 
					this.__r_set['category'] = 1;
				}else{					   
					this.__r_set['category'] = 0;
				}
			break;
		}
		this.__r_set['calories']=Math.round(this.__r_set['calories'])
		
		//console.log('collate')
		//console.log(this.__r_set)
	}
	this.transitionIn = function(page){
		switch(page){
			case 2:
				$back.delay(800).fadeIn(300)
			break;
			case 3:
				self.collate()
				$back.delay(3600).fadeIn(300,function(){
					self.__r_pages[1]['locked'] = false
					self.checkLock()
				})
				$units_mid.hide()
				$('#units_illo_left>img').css('opacity',0)
				$('#units_illo_right>img').css('opacity',0)
				$units_text.hide()
				$units_caption.hide()
				setTimeout(function(){self.animateUnits()},300)
				if(audio){
					audio_obj_0.play();
				}
			break;
			case 4:
				
				
				$calories_mid.hide()
				$calories_caption.hide()
				$calories_foot.hide()
				$pie_chart.css('opacity',0).css('background-position','6px 6px').fadeTo(1000,1)
				$back.delay(3600).fadeIn(300,function(){
					self.__r_pages[2]['locked'] = false
					self.checkLock()
				})
				setTimeout(function(){self.animateCalories()},700)
				if(audio){
					audio_obj_0.pause();
					audio_obj_1.play();
				}
			break;
			case 5:
				
				
				$cost_mid.hide()
				$cost_foot.hide()
				$('#cost_illo_left>img').css('opacity',0)
				$('#cost_illo_right>img').css('opacity',0)
				$back.delay(3600).fadeIn(300,function(){
					self.__r_pages[3]['locked'] = false
					self.checkLock()
				})
				setTimeout(function(){self.animateCost()},700)
				if(audio){
					audio_obj_1.pause();
					audio_obj_2.play();
				}
			break;
			case 6:
				$means_body.html('')
				if(audio){
					audio_obj_2.pause();
				}
				$back.fadeIn(300,function(){
					self.__r_pages[4]['locked'] = false
					self.checkLock()
				})
				setTimeout(function(){self.renderMeans()},300)
				
			break;
			case 7:
				$do_body.html('')
				$back.fadeIn(300,function(){
					self.__r_pages[5]['locked'] = false
					self.checkLock()
				})
				setTimeout(function(){self.renderDo()},300)
				
			break;
		}
		self.checkLock()
	}
	this.restoreState = function(page){
		console.log('restoreState '+page)
		switch(page){
			case 2:
				$back.show()
			break;
			case 3:
				self.collate()
				self.__r_pages[1]['locked'] = false
				$units_mid.hide()
				$('#units_illo_left>img').css('opacity',0)
				$('#units_illo_right>img').css('opacity',0)
				$units_text.hide()
				$units_caption.hide()
				setTimeout(function(){self.animateUnits()},300)
			break;
			case 4:
				self.__r_pages[2]['locked'] = false
				$calories_mid.hide()
				$calories_caption.hide()
				$calories_foot.hide()
				setTimeout(function(){self.animateCalories()},300)
			break;
			case 5:
				self.__r_pages[3]['locked'] = false
				$cost_mid.hide()
				$cost_foot.hide()
				setTimeout(function(){self.animateCost()},300)
			break;
			case 6:
				self.__r_pages[4]['locked'] = false
				self.checkLock()
				setTimeout(function(){self.renderMeans()},300)
			break;
			case 7:
				self.__r_pages[5]['locked'] = false
				self.checkLock()
				setTimeout(function(){self.renderDo()},300)
			break;
		}
		self.checkLock()
	}
	this.transitionOut = function(page){
		switch(page){
			case 2:
				if(audio){
					audio_obj_0.pause();
					audio_obj_0.currentTime = 0;
				}
			break;
		}
		self.checkLock()
	}
	this.renderMeans = function(){
		switch(self.__r_set['category']){
			case 0:
				$warning.html(self.__r_set['units']+' units = Higher risk')
				$warning.css('background-color','#F00');
			break;
			case 1:
				$warning.html(self.__r_set['units']+' units = Increasing risk')
				$warning.css('background-color','#F15B29');
			break;
			case 2:
				$warning.html(self.__r_set['units']+' units = Lower risk')
				$warning.css('background-color','#8BC53F');
			break;
		}
		gender_str = genders[self.__gender]
		var msg = self.__vc.__data.risk_text[self.__r_set['category']][gender_str]['caption']+'<br><br>'
		if(self.__r_set['category'] <=1){
			var bullets = self.__vc.__data.risk_text[self.__r_set['category']][gender_str]['bullets']
			msg+='<ul>'
			for(var i = 0;i<bullets.length;i++){
				msg+='<li>'+bullets[i]+'</li>'
			}
			msg+='</ul>'
		}
		$means_body.html(msg)
		$warning.fadeIn(300);
		$back.fadeIn(300);
	}
	this.renderDo = function(){
		gender_str = genders[self.__gender]
		shuffle(self.__vc.__data.take_action_text)
		msg='<ul>'
		for(var i = 0;i<4;i++){
			msg+='<li>'+self.__vc.__data.take_action_text[i]+'</li>'
		}
		msg+='</ul>'
		msg+='<span class="green">'+self.__vc.__data.risk_text[self.__r_set['category']][gender_str]['take_action']+'</span>'
		$do_body.html(msg)
		$back.fadeIn(300);
	}
	this.animateCost = function(){
		
		var costEffect = new rollText('cost',self.__r_set.cost.toFixed(2),'',$cost_mid,'£')
		$cost_mid.hide().fadeIn(500);
		$('#cost_illo_left>img').css('margin-left',-150).css('opacity',0).delay(2000).animate({opacity:1,marginLeft:0}, 500);
		$('#cost_illo_right>img').css('margin-right',-150).css('opacity',0).delay(2600).animate({opacity:1,marginRight:0}, 500);
		$cost_foot.delay(1400).fadeIn(500)
		$cost_foot.html("That's £" + (self.__r_set.cost*52).toFixed(2) + " a year if you only drank this amount once a week!")	
	}
	this.animateCalories = function(){	
		var caloriesEffect = new rollText('calories',self.__r_set.calories,'',$calories_mid,null)
		$calories_mid.show()
		if(self.__gender == 0){
			p = Math.min(99,(self.__r_set['calories']/2500)*100)
		}else{
			p = Math.min(99,(self.__r_set['calories']/2000)*100)
		}
		var c = 0
		var x = 0
		var y = 0
		var i = 1000/p
		var p_timer = setInterval(setPie,i)
		function setPie(){
			if(c<p){
				c++
				x = 6-((c%10*110))
				y = 6-(((Math.floor(c/10))*110))
				$pie_chart.css('background-position',x+'px '+y+'px')
			}else{
				clearInterval(p_timer)
			}
		}
		$calories_caption.delay(1000).fadeIn(500)
		$calories_foot.delay(1400).fadeIn(500)
		var str = self.__vc.__data.misc_text.calories_footer
		if(self.__gender == 0){
			str = str.replace('[gender]','man').replace('[calories]','<span>2500</span>')
		}else{
			str = str.replace('[gender]','woman').replace('[calories]','<span>2000</span>')
		}
		$('#calories_foot').html(str)
	}
	this.animateUnits = function(){	
		var unitsEffect = new rollText('units',self.__r_set.units,'contra',$units_mid,null)
		$units_caption.html(self.__vc.__data['misc_text']['unit_info'][self.__gender])
		$units_text.delay(900).fadeIn(300)
		$units_caption.delay(1400).fadeIn(300)
		$('#units_illo_left>img').css('margin-left',-150).css('opacity',0).delay(2000).animate({opacity:1,marginLeft:0}, 500);
		$('#units_illo_right>img').css('margin-right',-150).css('opacity',0).delay(2600).animate({opacity:1,marginRight:0}, 500);	
	}
	this.setGender = function(val){
		self.__gender = val
		var targets = new Array($('#man>img'),$('#woman>img'))
		if(val == 0){
			var tmp = targets[0].attr('src')
			targets[0].attr('src',tmp.replace('man.png','man_ovr.png'))
			tmp = targets[1].attr('src')
			targets[1].attr('src',tmp.replace('man_ovr.png','man.png'))
		}else{
			tmp = targets[1].attr('src')
			targets[1].attr('src',tmp.replace('man.png','man_ovr.png'))
			tmp = targets[0].attr('src')
			targets[0].attr('src',tmp.replace('man_ovr.png','man.png'))
		}
		self.__r_pages[0]['locked'] = false
		self.collate()
		self.checkLock()
	}
	this.toggleOver = function(target,k){
		var key = k
		
		var img =$(target.selector+'>img')
		var img_src = img.attr('src')
		target.bind('click',function(){
			if(self.__gender == null){
				self.setGender(key)
			}else{
				self.setGender((self.__gender+1)%2)
			}
			self.__vc.__state_obj.storeState();
		})
		target.bind('mouseover',function(){
			if(self.__gender != key){
				img.attr('src',img_src.replace('.png','_ovr.png'))
			}
		})
		target.bind('focus',function(){
			if(self.__gender != key){
				img.attr('src',img_src.replace('.png','_ovr.png'))	
			}
		})
		target.bind('focusout',function(){
			if(self.__gender != key){
				img.attr('src',img_src)
			}
		})
		target.bind('mouseout',function(){
			if(self.__gender != key){
				img.attr('src',img_src)
			}
		})
	}
	this.checkLock = function(){
		//console.log('check lock '+(self.__vc.__page-2))
		if(self.__vc.__page>=2){
			if(!self.__r_pages[self.__vc.__page-2]['locked'] && self.__vc.__page<7){
				//console.log('unlocked')
				$next.fadeIn()
			}else{
				//console.log('locked')
				$next.fadeOut()
			}
		}
	}
	this.toggleOver($man,0)
	this.toggleOver($woman,1)
}