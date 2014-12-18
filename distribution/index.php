<?php

/* Environment */
$host = $_SERVER['HTTP_HOST'];
$base_url = "http://" . $host;
$full_url = $base_url . dirname($_SERVER['REQUEST_URI']);

$environment_id;
$environment_root;
$minified_js;
if($host === 'HOST-NAME'){
	$environment_id = 'local';
	$environment_root = '/';
	$minified_js = false;
}else{
	$environment_id = 'local';
	$environment_root = '/';
	$minified_js = false;
}

/* Misc Vars */
$google_api_key = 'AIzaSyBL8bygc0XJqS3IXT9QI5_pfBTD-YAsrQo';
$version_number = '0.0.1';

?>

<!DOCTYPE html >
	<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 loading"> <![endif]-->
	<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 loading"> <![endif]-->
	<!--[if IE 8]>         <html class="no-js lt-ie9 loading"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js loading"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		
		<title>FE - Boilerplate</title>
		
		<meta name="description" content="">

		<meta name="viewport" content="width=device-width">

		<base href="<?php echo $environment_root ?>" />	

		<script> var environment = {id:'<?php echo $environment_id ?>', root:'<?php echo $environment_root ?>', version:'<?php echo $version_number ?>'}; </script>

		<link rel="stylesheet" href="css/main.min.css">

		<link rel="apple-touch-icon" href="apple-touch-icon.png"/>
		<link rel="apple-touch-icon-precomposed" href="apple-touch-icon.png"/>
	</head>
	<body>
		<!--[if lt IE 7]>
		<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		<![endif]-->

		<div data-region="container" class="container">
			<div data-region="app"></div>
		</div>
		
		<script>
			var script = document.createElement('script');
	        script.type = 'text/javascript';
	        script['data-main'] = 'js/main';
	        script.src = 'js/main<?php echo $minified_js?".min":"" ?>.js';
	        document.body.appendChild(script);
		</script>

		<script>
			var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
				g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
				s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>
	</body>
</html>
