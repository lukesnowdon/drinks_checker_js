<?php
header( 'Content-Type: application/javascript' );
$output = '';
if ($handle = opendir('js/')) {
    while (false !== ($entry = readdir($handle))) {
		
        
		if(strlen($entry)>5 && !strstr($entry,"min")&& strstr($entry,".js") && !strstr($entry,"dc_launcher.js")){
			//echo "<br>js/$entry\n";
			$h = fopen("js/$entry", "rb");
			$output.= stream_get_contents($h)."
";
			fclose($h);
		}
		
	}
    closedir($handle);
}
echo $output;
?>