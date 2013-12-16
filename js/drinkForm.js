function drinkForm(vc,mode){
	var self = this
	var $c4l_input_1,$c4l_input_2,$c4l_input_3
	var avg = new Array()
	var data_set
	var units = 0
	self.__vc = vc
	self.__mode = mode
	var output = '';
	var selected = {}
	switch(mode){
		case 'desktop':
			$c4l_input_0 = $('#input_0')
			$c4l_input_1 = $('#input_1')
			$c4l_input_2 = $('#input_2')
		break;
		case 'tablet':
			$c4l_input_0 = $('#input_0')
			$c4l_input_1 = $('#input_1')
			$c4l_input_2 = $('#input_2')
		break;
	}
	this.changePriceInput = function(){
		self.collate()
		$('#price').resetSS()
		$('#priceCont').html('')
		self.setPriceInput(selected['size'])		
	}
	this.setPriceInput = function(v){
		var output = '<select id="price" >'
		avg[1] = data_set[2][v][1][0]
		for(var i = 1;i<data_set[2][v][1].length;i++){
			if(data_set[2][v][1][i] == avg[1]){
				output+= '<option class = "avg" value="'+data_set[2][v][1][i]+'">£'+data_set[2][v][1][i].toFixed(2)+'</option>'
			}else{
				output+= '<option value="'+data_set[2][v][1][i]+'">£'+data_set[2][v][1][i].toFixed(2)+'</option>'
			}		
		}
		output+='</select>'
		$('#priceCont').html(output)
		$('#price').sSelect({ddMaxHeight:286}).change(function(){self.collate()});
		$('#price').getSetSSValue(data_set[2][v][1][0]);
	}
	this.collate = function(){
		var str = ($('#strengthCont .selectedTxt').html())
		for(var i = 1;i<data_set[1].length;i++){
			if(str == data_set[1][i]+'%'){
				selected['strength'] = i
				break;
			}
		}
		str = ($('#sizeCont .selectedTxt').html())
		for(var i = 0;i<data_set[2].length;i++){
			if(str == data_set[2][i][0]){
				selected['size'] = i
				break;
			}
		}
		str = ($('#priceCont .selectedTxt').html())
		for(var i = 1;i<data_set[2][selected['size']][1].length;i++){
			if(str == '£'+data_set[2][selected['size']][1][i].toFixed(2)){
				selected['price'] = i
				break;
			}
		}
		if(selected['id'] == 3){
			str = ($('#mixerCont .selectedTxt').html())
			if(str == 'None'){
				selected['mixer'] = null
			}else{
				for(var i = 1;i<data_set[3].length;i++){
					if(str == data_set[3][i]){
						selected['mixer'] = i
						break;
					}
				}
			}
		}
		units = (data_set[2][selected['size']][2]*data_set[1][selected['strength']]*selected['quantity']).toFixed(1)
		selected['units'] = parseFloat(units)
		var cal_multiplier = data_set[2][selected['size']][3]
		var strength = data_set[1][selected['strength']]
		if(selected['id']==0){
			if(strength >= 2 && strength <=3 ){
				cal_multiplier = 0.25;		
			}else if( strength >= 3.5 && strength <=5 ){
				cal_multiplier = 0.38;
			}else if(strength >= 5.5 && strength <=6 ){
				cal_multiplier = 0.49;
			}else if( strength >= 7 && strength <=9 ){
				cal_multiplier = 0.64;
			}
		}
		selected['calories'] = (data_set[2][selected['size']][2]*1000)*cal_multiplier*selected['quantity']
		var str = selected['quantity']+' x '+data_set[2][selected['size']][0]+' = '+units+' units'
		$c4l_input_2.html(str);
	}
	this.quantity = function(q){	
		if(!(selected['quantity']==1 && q ==-1)){
			selected['quantity']+=q
			$('#quantity').html(selected['quantity'])
		}
		if(selected['quantity']==1){
			$('#fewer').fadeTo(200,0.5)
		}else{
			$('#fewer').fadeTo(200,1)
		}
		self.collate()
	}
	this.clear = function(){
		$('#size').resetSS()
		$('#price').resetSS()
		$('#strength').resetSS()
		if(selected['id'] == 3){
			$('#mixer').resetSS()
		}
		$c4l_input_1.html('').off('click')
		$c4l_input_2.html('').off('click')
		$('#cancel').off('click')
		$('#add').off('click')
		
	}
	this.setForm = function(id,data){
		selected = {'quantity':1,'size':0,'strength':0,'price':0,'units':0,'mixer':null,'id':id}
		avg = new Array()
		data_set = data
		switch(self.__mode){
			case 'tablet':
				$c4l_input_0.html('<div>'+data[0]+'</div><img src="images/drinks_0'+(id+1)+'_illo.png" width="184" height="200" />')
				output = '<h2>How strong?</h2><div class="picker" id="strengthCont"></div>'
				$c4l_input_1.html(output)
				var strength_picker = new picker(__vc,$('#strengthCont'),{'aspect':'h','width':250,'height':60,'series':[2,2.5,3,3.5,4,4.5,5,5.5,6,6.5],'emphasis':5,'selected':6});
				//self.setPriceInput(0);	
				//self.collate()
			break;
			case 'desktop':
				$c4l_input_0.html('<div>'+data[0]+'</div><img src="images/drinks_0'+(id+1)+'_illo.png" width="184" height="200" />')
				output = '<h2>How strong?</h2><div class="selCont" id="strengthCont"><select id="strength" name="strength" >'
				avg[0] = data[1][0]
				for(var i = 1;i<data[1].length;i++){
					
					if(data[1][i] == avg[0]){
						output+= '<option value="'+data[1][i]+'" class = "avg">'+data[1][i]+'%</option>'
					}else{
						output+= '<option value="'+data[1][i]+'">'+data[1][i]+'%</option>'
					}
				}
				output+= '</select></div>'
				output+= '<h2>What size?</h2><div class="selCont" id="sizeCont"><select id="size" name="size" >'
				for(var i = 0;i<data[2].length;i++){
					output+= '<option value="'+data[2][i][0]+'">'+data[2][i][0]+'</option>'
				}
				output+= '</select></div>'
				output+= '<h2>What price?</h2><div class="selCont" id="priceCont"></div>'
				if(id == 3){
					output+= '<h2>Mixer?</h2><div class="selCont" id="mixerCont"><select id="mixer" name="mixer" >'
					for(var i = 0;i<data[3].length;i++){
						output+= '<option value="'+data[3][i]+'">'+data[3][i]+'</option>'
					}
					output+= '</select></div>'
				}
				output+= '<br><h2>How many?</h2><div class="quantity"><a href="javascript:;" id = "fewer"><img src="images/fewer.png" width="30" height="28"></a>'
				output+= '<a href="javascript:;" id = "more"><img src="images/more.png" width="30" height="28"></a>'
				output+= '<div id="quantity">1</div></div>'
				$c4l_input_1.html(output)
				
				$('#strength').sSelect({ddMaxHeight:450}).change(function(){self.collate()});
				$('#strength').getSetSSValue(avg[0]);
				
				$('#size').sSelect({ddMaxHeight:400}).change(function(){self.changePriceInput()});
				$('#size').getSetSSValue(data[2][0][0]);
				
				autoOver($('#more'))
				autoOver($('#fewer'))
				$('#more').on('click',function(){self.quantity(1)})
				$('#fewer').on('click',function(){self.quantity(-1)})
				$('#fewer').css('opacity',0.5)
				autoOver($('#cancel'))
				autoOver($('#add'))
				$('#cancel').on('click',function(){
					self.clear()
					self.__vc.slidePrev()
				})
				$('#add').on('click',function(){
					if(self.__vc.__drinks.length == 0){
						var data = {'title':'<br>'+self.__vc.__data.misc_text.selection_alert,'body':''}
						self.__vc.__modal.launch(data)
					}
					self.__vc.__drinks.push(selected)
					self.__vc.updateDrinks()
					self.clear()
					self.__vc.slidePrev()
				})
				if(id == 3){
					$('#mixer').sSelect({ddMaxHeight:200}).change(function(){self.collate()});
					$('#mixer').getSetSSValue(data[3][0]);
				}
				self.setPriceInput(0);	
				self.collate()
			break;
		}
	}
}