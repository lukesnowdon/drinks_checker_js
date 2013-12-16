function editPanel(vc){
	var self = this;
	self.__vc = vc
	self.__active = false
	var $outer = $('#edit_outer')
	var $inner = $('#edit_inner') 
	var $scroll_pane = $('#edit_inner>div') 
	var $close = $('#edit_close') 
	$close.click(function(){self.slideDn()})
	this.slideUp = function(){
		self.populate()
		$outer.show()
		$inner.animate({'margin-top':0},300)
		$close.css('opacity',0).css('top',380).show()
		$close.animate({'opacity':1,'top':36},300)
		self.__active = true
		for(var i = 0;i<self.__vc.__drinks_summary.length;i++){
			self.__vc.__starbursts[i][0].fadeOut(300)
		}
	}
	this.slideDn = function(){
		$close.animate({'opacity':0,'top':380},300)
		$inner.animate({'margin-top':380},300,function(){
			$outer.hide()
			$close.hide()
			self.clearEditPanel()
		})
		self.__vc.updateDrinks()
		self.__active = false
	}
	this.editDrinkData = function(e){
		var tmp = e.id.split('_')
		if(tmp[1] != 'delete'){
			self.__vc.__drinks[parseInt(tmp[2])][tmp[1]]=parseFloat(e.value)
			var selected = self.__vc.__drinks[parseInt(tmp[2])]
			var data_set = self.__vc.__data.drinks[selected['id']]
			var units = (data_set[2][selected['size']][2]*data_set[1][selected['strength']]*selected['quantity'])
			self.__vc.__drinks[parseInt(tmp[2])]['units']=units
		}else{
			for(var i = 0;i<self.__vc.__drinks.length;i++){
				$('#edit_quantity_'+i).off('change')
				$('#edit_price_'+i).off('change')
				$('#edit_delete_'+i).off('click')
			}
			self.clearEditPanel()
			self.__vc.__drinks.splice(parseInt(tmp[2]),1)
			self.populate()
		}
		self.__vc.updateDrinks()
		//console.log(self.__vc.__drinks)
	}
	this.clearEditPanel = function(){
		$scroll_pane.html('')
		for(var i = 0;i<self.__vc.__drinks.length;i++){
			$('#edit_quantity_'+i).off('change')
			$('#edit_price_'+i).off('change')
			$('#edit_delete_'+i).off('click')
		}
	}
	this.populate = function(){
		//console.log('populate')
		var drinks = self.__vc.__drinks
		var data = self.__vc.__data
		var output = ''
		for(var i = 0;i<drinks.length;i++){
			output+='<div class = "edit_row" id="er_'+i+'">'
			output+='<div class = "col" style="width:112px;">'+data.drinks[drinks[i]['id']][0]+'</div>'
			output+='<div class = "col" style="width:50px;">'+data.drinks[drinks[i]['id']][1][drinks[i]['strength']]+'%</div>'
			output+='<div class = "col" style="width:90px;">'+data.drinks[drinks[i]['id']][2][drinks[i]['size']][0]+'</div>'
			output+='<div class = "col" ><select id="edit_quantity_'+i+'" style="width:50px;" >'
			for(var j = 1;j<=20;j++){
				if(drinks[i]['quantity']== j){
					output+='<option selected = "selected" value="'+j+'">'+j+'</option>'
				}else{
					output+='<option value="'+j+'">'+j+'</option>'
				}
			}
			output+='</select></div>'
			output+='<div class = "col" ><select id="edit_price_'+i+'" name="edit_price_'+i+'" style="width:80px;" >'
			for(var j = 0;j<data.drinks[drinks[i]['id']][2][drinks[i]['size']][1].length;j++){
				if(drinks[i]['price']== j){
					output+='<option selected = "selected" value="'+j+'">£'+data.drinks[drinks[i]['id']][2][drinks[i]['size']][1][j].toFixed(2)+'</option>'
				}else{
					output+='<option value="'+j+'">£'+data.drinks[drinks[i]['id']][2][drinks[i]['size']][1][j].toFixed(2)+'</option>'
				}
			}
			output+='</select></div>'
			output+='<input type = "button" id="edit_delete_'+i+'" value = "Delete">'
			output+='</div>'
		}
		
		$scroll_pane.html(output)
		for(var i = 0;i<drinks.length;i++){
			$('#edit_quantity_'+i).on('change',function(){self.editDrinkData(this)})
			$('#edit_price_'+i).on('change',function(){self.editDrinkData(this)})
			$('#edit_delete_'+i).on('click',function(){self.editDrinkData(this)})
		}
	}
}