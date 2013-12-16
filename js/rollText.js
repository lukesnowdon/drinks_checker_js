function rollText(k,v,s,c,p){
	var key = k
	var prefix = p
	var $cont = c
	var vals = v.toString()
	var style = s
	var output = ''
	var self = this
	var l = 0
	var c
	var numerals = Array()
	this.init = function(){
		output = '<div id="numeral_'+key+'" class="numeral_wrap">'
		if(prefix){
			output+= '<div  class="numeral_prefix" >'+prefix+'</div>'
			l+=51
		}
		numerals = Array()
		c = 0
		for(var i = 0;i<vals.length;i++){
			n = vals.substring(i,i+1)
			if(n=='.'){
				output+='<div class="numeral" style="left:'+l+'px;">.</div>'
				l+=18
			}else{
				
				output+='<div class="numeral" id="numeral_'+key+'_'+c+'" style="left:'+l+'px;">'
				numerals.push('numeral_'+key+'_'+c)
				l+=51
				n = parseInt(n)
				for(var j = 0;j<10;j++){
					if(style == 'contra' && c%2 == 1){
						output+=wrapInt((n-8)+j)+'<br>'
					}else{
						output+=wrapInt(n-j)+'<br>'
					}
				}
				c++
				output+='</div>'
			}
		}
		output+='</div><div class="numeral_overlay"><img src="images/number_mask.png" width="'+(l+50)+'" height="92" /></div>'
		$cont.html(output)
		$cont.show()
		for(i = 0;i<numerals.length;i++){
			var $n = $('#'+numerals[i])
			if(style == 'contra' && i%2 == 1){
				$n.css('opacity',0).delay(i*100).animate({opacity:1,top:(5-($n.height()*0.8))}, 700);
			}else{
				$n.css('opacity',0).css('top',(5-$n.height())).delay(i*100).animate({opacity:1,top: 5}, 650);
			}
		}
		var $wrap = $('#numeral_'+key)
		$wrap.css('width',l)
	}
	self.init()
}
