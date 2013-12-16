<?php
for($i = 1;$i<=100;$i++){
	echo '<image src = "pie_anim/pie_anim00'.str_pad($i,2,'0',STR_PAD_LEFT).'.png">';
	if($i%10 == 0){
		echo '<br>';
	}
}
?>