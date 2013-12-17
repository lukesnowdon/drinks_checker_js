function view_controller(){
	var self = this;
	var url_vars = getUrlVars()
	self.__tabbing = false
	self.__variant = 'desktop'
	if(url_vars.variant != undefined){
		self.__variant = url_vars.variant
	}
	
	if(self.__variant == 'phone'){
		$('#desktop').remove()
		var $container = $('#phone')
	}else{
		$('#phone').remove()
		var $container = $('#desktop')
	}	
	this.__width = 530
	this.__height = $(window).height();
	this.__padding;
	this.__delay = 0
	this.__page = 0;
	this.__adjusted_page = 0
	this.__data;
	this.__area = ((window.screen.height / window.devicePixelRatio) * (window.screen.width / window.devicePixelRatio))
	this.__device = isMobile.any();
	this.__retina = window.devicePixelRatio > 1;
	this.__max_pages = 9
	
	this.__drinks = new Array()
	this.__starbursts = new Array([$('#stb_0'),5,46],[$('#stb_1'),156,88],[$('#stb_2'),318,56],[$('#stb_3'),80,210],[$('#stb_4'),290,210])
	this.__drinks_summary = new Array({'units':0,'quantity':0},{'units':0,'quantity':0},{'units':0,'quantity':0},{'units':0,'quantity':0},{'units':0,'quantity':0})
	
	var $check_now = $('#check_now').hide()
	var $edit = $('#edit').hide()
	var $inner = $('#inner')
	var $mob_inner = $('#mob_inner')
	var $mob_launch = $('#mob_launch')
	var $mob_cancel = $('#mob_cancel')
	var $email = $('#email')
	var $start_again = $('#start_again')
	var $next = $('#next')
	var $back = $('#back')
	var $pages = new Array()
	var slidelock = false;
	var email = ''
	this.__outer = $('#antbits_dc')
	
	this.__form_hidden = true
	
	this.__analytics_obj = new analyticsObj(this)
	this.__modal = new modal(this,self.__outer);
	this.__drink_form = {}
	this.__edit_panel = new editPanel(this);
	this.__state_obj = new maintain_state(this);
	this.__results  = new results(this);
	// target devices
	//self.__retina = true
	if(self.__retina){
		if(self.__variant == 'phone'){
			var $images = $('#phone img')
		}else{
			var $images = $('#desktop img')
		}
		$images.each(function () {
			var thisSRC = $(this).attr('src');
			var new_src = $(this).attr('src').replace('images/', 'images/retina.');
			$(this).attr('src', new_src);
		});
	
	}
	if(self.__device && self.__variant == 'desktop'){
		var url_str = 'phone'
		if(isMobile.Tablet()){
			var url_str = 'tablet'
		}else{
			$container = $('#phone')
			var $inner = $('#phone .inner')
		}
		$('#mob_launch').fadeIn(500)
		$mob_inner.click(function(e){
			parent.window.location = "drinks_checker.html?variant="+url_str
		})
		$mob_launch.click(function(e){$mob_launch.css("visibility","hidden");return false;})
		$mob_cancel.click(function(e){$mob_launch.css("visibility","hidden");return false;})
	}
	if(self.__variant != 'phone'){
		loadjscssfile('css/c4l_dc_desktop.css','css')
	}else{
		loadjscssfile('css/c4l_dc_phone.css','css')
	}
	
	
	
	this.resizeLayout = function(){
		page_height = 0
		switch(self.__variant){
			case 'desktop':
				
			break;
			case 'phone':
				
			break;
			case 'tablet':
				
			break;
		}
	}

	this.preload = function(){
		self.init()
	}
	//$.getJSON('json.php', function(data) {
	$.getJSON('json.js', function(data) {
		self.__data = data
		console.log(data)
		self.preload();
	});
	this.init = function(){
		$container.fadeIn(500)
		switch(self.__variant){
			case 'desktop':
				var $splash = $('#dt_p_0>div>div')
				var $start = $('#dt_start')
				autoOver($start)
				autoOver($next)
				autoOver($back)
				autoOver($edit)
				autoOver($check_now)
				autoOver($email)
				autoOver($start_again)
				$splash.html(self.__data.misc_text.splash)
				$inner.width(self.__max_pages*self.__width)
				this.__drink_form = new drinkForm(self,'desktop')
				for(var i=0;i<self.__starbursts.length;i++){
					self.__starbursts[i][0].css('left',self.__starbursts[i][1]).css('top',self.__starbursts[i][2]).hide()
					self.__starbursts[i][0].click(function(){self.addDrink(this)}).mouseover(function(){
						
						var id = this.id.substr(4,1)
						//alert(id)
						var img =$('#drink_'+id+'>img')
						var img_src = img.attr('src')
						img.attr('src',img_src.replace('.png','_ovr.png'))
					}).mouseout(function(){
						var id = this.id.substr(4,1)
						var img =$('#drink_'+id+'>img')
						var img_src = img.attr('src')
						img.attr('src',img_src.replace('_ovr.png','.png'))
					})
				}
				for(var i=0;i<self.__max_pages;i++){
					$pages.push($('#dt_p_'+i))
					$pages[i].css('left',i*530)
					
				}
			break;
			case 'tablet':
				var $splash = $('#dt_p_0>div>div')
				var $start = $('#dt_start')
				$splash.html(self.__data.misc_text.splash)
				$inner.width(self.__max_pages*self.__width)
				this.__drink_form = new drinkForm(self,'tablet')
				for(var i=0;i<self.__starbursts.length;i++){
					self.__starbursts[i][0].css('left',self.__starbursts[i][1]).css('top',self.__starbursts[i][2]).hide()
					self.__starbursts[i][0].click(function(){self.addDrink(this)}).mouseover(function(){
						var id = this.id.substr(4,1)
						//alert(id)
						var img =$('#drink_'+id+'>img')
						var img_src = img.attr('src')
						img.attr('src',img_src.replace('.png','_ovr.png'))
					}).mouseout(function(){
						var id = this.id.substr(4,1)
						var img =$('#drink_'+id+'>img')
						var img_src = img.attr('src')
						img.attr('src',img_src.replace('_ovr.png','.png'))
					})
				}
				for(var i=0;i<self.__max_pages;i++){
					$pages.push($('#dt_p_'+i))
					$pages[i].css('left',i*530)
					
				}
			break;
			case 'phone':
				
			break;
		}
		
		$start.on('click',function(){self.slideNext()})
		$start_again.on('click',function(){self.startAgain()})
		$edit.on('click',function(){self.editDrinks()})
		$next.on('click',function(){self.slideNext()})
		$email.on('click',function(){self.email()})
		$back.on('click',function(){
			self.slidePrev()
			if(self.__page <2){
				$('#'+this.parentNode.id).fadeOut();
			}
		})
		$check_now.on('click',function(){
			self.hideForm(true)
			self.slideNext()
		})
		
		//console.log($pages)
		for(i=0;i<5;i++){
			var d = $('#drink_'+i)
			autoOver(d)
			d.click(function(){
				self.hideForm(false)
				self.addDrink(this)
			})
		}	
		
		
		self.manageTabbing(1)
		self.__results.init()
		self.__state_obj.restoreState();
	}
	this.startAgain = function(){
		self.__drinks = new Array()
		self.updateDrinks()
		$inner.fadeOut(500,function(){
			self.jumpTo(0)
			$inner.fadeIn(500)
		})	
	}
	this.email = function(){
		var body_str = '<div id = "email_form">enter your email address<br><input type = "text" id = "email_input" value="design@lukesnowdon.co.uk"><br><a href = "javascript:;" id = "send"><img src = "images/send.png"></a></div>'
		var data = {'title':'Email your results','body':body_str}
		self.__modal.launch(data)
		var $send = $('#send')
		$send.on('click',function(){
			email = $('#email_input').val()
			if(validateEmail(email)){
				$('#send>img').attr('src','images/sending.gif')
			}
		})
	}
	this.hideForm = function(bool){
		var c = 0
		self.__form_hidden = bool
		for(var i=0;i<$pages.length;i++){
			if(bool && i == 2){
				$pages[2].css('top',1000)
			}else{
				$pages[i].css('left',c*530).css('top',0).show()
				c++
			}
		}
	}
	this.addDrink = function(evt){
		self.slideNext()
		var id = parseInt(evt.id.slice(-1))
		self.__drink_form.setForm(id,self.__data.drinks[id])
	}
	
	this.jumpTo = function(val){
		if(!self.__form_hidden && self.__page ==2){
			self.__page = 1
		}else{
			self.__page = val
		}
		if(self.__form_hidden && self.__page >=2){
			self.__adjusted_page = self.__page+1
			for(var i = 3;i<self.__page;i++){
				self.__results.restoreState(i)
			}
			self.__results.transitionIn(self.__page)
		}else{
			self.__adjusted_page = self.__page
		}
		$inner.css("marginLeft",(0-(self.__width*self.__page)));
		$pages[self.__adjusted_page].show()
		
		
	}
	this.slideNext = function(){
		if(self.__page<self.__max_pages  && !slidelock){
			self.manageTabbing(0)
			self.__page++;
			if(self.__form_hidden && self.__page >=2){
				self.__adjusted_page = self.__page+1
				self.__results.transitionIn(self.__page)
			}else{
				self.__adjusted_page = self.__page
			}
			
			$inner.animate({marginLeft: (0-(self.__width*self.__page))}, 400,function(){self.manageTabbing(1)});
			self.__state_obj.storeState();
			if(self.__variant == 'phone'){
				window.scrollTo(0, 1);
			}
		}
	}
	this.slidePrev = function(){
		if(self.__page>0  && !slidelock){
			self.manageTabbing(0)
			self.__page--;
			if(self.__form_hidden && self.__page >=2){
				self.__adjusted_page = self.__page+1
				self.__results.transitionOut(self.__page)
			}else{
				self.__adjusted_page = self.__page
				$('#result_next').fadeOut()
			}
			$inner.animate({marginLeft: (0-(self.__width*self.__page))}, 400,function(){self.manageTabbing(1)});
			self.__state_obj.storeState();
			if(self.__variant == 'phone'){
				window.scrollTo(0, 1);
			}
		}	
	}
	this.editDrinks = function(){
		if(this.__edit_panel.__active){
			this.__edit_panel.slideDn()
		}else{
			this.__edit_panel.slideUp()
		}
		
		//var output = '!!'
		//self.__modal.launch({title:'test',body:output,w:240,h:120,callback:''})
	}
	this.updateDrinks = function(){
		if(this.__drinks.length>0){
			$edit.fadeTo(500,1)
			$check_now.fadeTo(500,1)
		}else{
			$edit.fadeTo(500,0)
			$check_now.fadeTo(500,0)
		}
		this.__drinks_summary = new Array({'units':0,'quantity':0,'cost':0,'calories':0},{'units':0,'quantity':0,'cost':0,'calories':0},{'units':0,'quantity':0,'cost':0,'calories':0},{'units':0,'quantity':0,'cost':0,'calories':0},{'units':0,'quantity':0,'cost':0,'calories':0})
		for(var i = 0;i<this.__drinks.length;i++){
			this.__drinks_summary[this.__drinks[i]['id']]['quantity']+=this.__drinks[i]['quantity']
			this.__drinks_summary[this.__drinks[i]['id']]['units']+=this.__drinks[i]['units']
			this.__drinks_summary[this.__drinks[i]['id']]['cost']+=this.__drinks[i]['price']*this.__drinks[i]['quantity']
			this.__drinks_summary[this.__drinks[i]['id']]['calories']+=this.__drinks[i]['calories']
		}
		for(var i = 0;i<this.__drinks_summary.length;i++){
			if(this.__drinks_summary[i]['quantity']>0){
				self.__starbursts[i][0].fadeIn(300)
				$('#stb_q_'+i).html(this.__drinks_summary[i]['quantity']+' drinks')
				$('#stb_u_'+i).html(this.__drinks_summary[i]['units'].toFixed(1)+' units')
			}else{
				self.__starbursts[i][0].fadeOut(300)
			}
		}
		
		
	}
	this.phoneResize = function(){
		/*var h = $pages[self.__adjusted_page].height()+44
		if(h > 0){
			$bmi_wrapper.css('overflow','hidden')
			$bmi_wrapper.height(h)
			
		}else{
			$bmi_wrapper.css('overflow','scroll')
		}*/
	}
	this.zeroPad = function( number, width ){
		  width -= number.toString().length;
		  if (width > 0){
			return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  }
		  return number + "";
	}
	this.lockView = function(){
		$content.find("a").attr("tabindex", -1);
		$content.find("input").attr("tabindex", -1);
	}
	this.unlockView = function(){
		$content.find("a").attr("tabindex", null);
		$content.find("input").attr("tabindex", null);
		self.manageTabbing()
	}
	
	this.manageTabbing = function(s){
		//console.log('manageTabbing '+s)
		if(s==0){
			slidelock = true
			for(var p=0;p<$pages.length;p++ ){
				$pages[p].show()
			}
		}else{
			slidelock = false
			for(var p=0;p<$pages.length;p++ ){
				if(p != self.__adjusted_page){
					$pages[p].hide()
				}else{
					if(self.__tabbing){
						/*switch(self.__adjusted_page){
							case 0:
								$('#start').focus();
							break;
							case 1:
								$('#adult').focus();
							break;
							case 2:
								$('#activity_0').focus();
							break;
							case 3:
								$('#why').focus();
							break;
							case 4:
								$('#advice_next').focus();
							break;
						}*/
					}
				}
			}
		}
		if(self.__variant == 'phone'){
			self.phoneResize()
		}
		if(self.__variant == 'tablet'){
			self.phoneResize()
		}
		
	}
	this.restoreState = function(data){
		if(data.page>0){
			self.__page = data.page
			self.hideForm(data.form_hidden)
			
			self.jumpTo(self.__page)
			self.__drinks = data.drinks
			self.updateDrinks()
		}
		if(data.gender != null && data.page>=2){
			self.__results.setGender(data.gender)
		}
		
	}
	this.resetDialog = function(){
			/*var output = '<div id = "reset_warning"><p>Are you sure you would like<br>to reset and clear all results?</p><a href="javascript:;" id = "yes_btn"><div>Yes</div></a><a href="javascript:;" id = "no_btn"><div>No</div></a></div>'
			self.__modal.launch({title:'',body:output,w:240,h:120,callback:"$('#yes_btn').click(function(){self.__vc.resetAll()});$('#no_btn').click(function(){self.quit()});"})
	}
	this.resetAll = function(){

		self.__state_obj.clearState()
		$('body').fadeOut(function(){
			location.reload();
		})*/
	}
	
	$(window).resize(function () {
		/*self.__width = $(window).width();
		self.__height = $(window).height();
		self.resizeLayout()*/
		
	});
	$(window).mousedown(function(e){
		self.__tabbing = false
	})
	$(window).keydown(function(e){
		if(e.keyCode == 9 || e.keyCode == 13){
			self.__tabbing = true
		}
	})
}