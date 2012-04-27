<!--<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
?>-->

<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

	<!-- Basic Page Needs
    ================================================== -->
	<meta charset="utf-8">
	<title>Python @ Columbia</title>
	<meta name="description" content="Site for tutorials and content for weekly Python meetings at Columbia.">
	<meta name="author" content="Adrian Price-Whelan">

	<!-- Mobile Specific Metas
    ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- CSS
    ================================================== -->
	<link rel="stylesheet" href="stylesheets/base.css">
	<link rel="stylesheet" href="stylesheets/skeleton.css">
	<link rel="stylesheet" href="stylesheets/layout.css">
	<link rel="stylesheet" href="stylesheets/style.css">
	<link rel="stylesheet" href="stylesheets/docs.css">
	
	<!-- JS
	================================================== -->
	<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script src="javascripts/tabs.js"></script>
	<script src="javascripts/jquery.cookies.2.2.0.js"></script>
    <script src="javascripts/Markdown.converter.js"></script>

	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/favicon.ico">
	<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

    <?php
        
        function getFileList($dir) {
            $dirhandler = opendir($dir);
            
            // read all the files from directory
            $nofiles=0;
            while ($file = readdir($dirhandler)) {
            
                // if $file isn't this directory or its parent 
                //add to the $files array
                if ($file != '.' && $file != '..')
                {
                    $nofiles++;
                    $files[$nofiles]=$file;
                }   
            }
            
            //close the handler
            closedir($dirhandler);
            sort($files);
            return json_encode($files);
        }
    ?>
    
    <script type="text/javascript">
        // Code to convert Markdown to HTML
        converter = new Markdown.Converter().makeHtml;

        $.getJSON("_getMDContent.php?file=Intro.md", function(data) {
            $(converter(data.content)).appendTo("div#intro");
            $("<hr class='large'/>").appendTo("div#intro");
        });
        
        data = $.parseJSON('<?php echo getFileList("md"); ?>');
        
        $.each(data, function(key, filename) {
            $.getJSON("_getMDContent.php?file=" + filename, function(data){
                content = converter(data.content);
                //alert(content);
                fileBase = filename.slice(0, -3);
                linkName = filename.slice(11, -3);
                $('#tutorialList').append("<li><a href='#" + fileBase + "'>" + linkName + "</a></li>");
                $("#" + fileBase).append(content);
                $("<hr class='large'/>").appendTo("#" + fileBase);
            });
        });
        
        // Get the current scroll position
        function getPageScroll() {
            var yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                yScroll = document.documentElement.scrollTop;
            } else if (document.body) {
                yScroll = document.body.scrollTop;
            }
            return yScroll
        }
        
        // Given a pixel position, scroll to that position
        function scrollToPosition(pos) {
            //set window scroll position if cookie is set
            var timerID = setInterval(function() {
                window.scrollBy(0, 100);
            
                if (window.pageYOffset >= pos)
                    clearInterval(timerID);
            }, 13);
        }
        
        
        // Code to save ("bookmark") scrolling position in cookie
        $(document).ready(function () {
            var scrollPosition = $.cookies.get('scrollBookmark');
            if (scrollPosition < 100) return;
            
            $.cookie("scrollBookmark", null);
            scrollToPosition(scrollPosition - 50);
        
        });

    </script>
    
    <!-- Google Analytics
	================================================== -->
    <script type="text/javascript">
    
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-11936482-11']);
      _gaq.push(['_trackPageview']);
    
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    
    </script>

</head>
<body>



	<!-- Primary Page Layout
	================================================== -->

	<!-- Delete everything in this .container and get started on your own site! -->

	<div class="container">
		<div class="three columns sidebar">
		    <nav>
                <h2 id="logo">Tutorials &amp; Meeting Notes</h2>
                <ul id="tutorialList">
                    <li><a href="#intro">Introduction</a></li>
                </ul>
                <br/>
                <!--<a class="button" id="bookmark" onMouseUp="$.cookies.set('scrollBookmark', getPageScroll());">Bookmark your <br/> current position→</a>-->
            </nav>
		</div><!-- three columns sidebar -->
		
		<div class="twelve columns offset-by-four content" id="mainContent">
		    <header>
                <h1 class="title">Python @ Columbia</h1>
                <p class="mailingList">
                    <a class="button" href="https://mail.astro.columbia.edu/mailman/listinfo/astro-python">Join the mailing list!</a>
                    <a class="button" href="http://github.com/adrn/Python-Columbia">Fork the project on GitHub</a>
                </p>
            </header>
            
            <hr class="large" />
            
            <div class="doc-section clearfix" id="intro">
            </div>
            
            <?php 
                $directory = "md";
                $dirhandler = opendir($directory);
                
                // read all the files from directory
                $nofiles=0;
                while ($file = readdir($dirhandler)) {
                
                    // if $file isn't this directory or its parent 
                    //add to the $files array
                    if ($file != '.' && $file != '..')
                    {
                        $nofiles++;
                        $files[$nofiles]=$file;
                    }   
                }
                
                //close the handler
                closedir($dirhandler);
                sort($files);
            ?>
            <?php foreach ($files as $id => $file): ?>
                <div class="doc-section" id="<?php print basename($file, '.md'); ?>">
                </div>
            <?php endforeach; ?>
            
		</div><!-- twelve columns offset-by-one content -->
	</div><!-- container -->
    
<!-- End Document
================================================== -->

</body>
</html>