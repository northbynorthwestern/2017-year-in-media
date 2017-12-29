var Tabletop = require('tabletop');
var Handlebars = require('handlebars');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

function generateArticles(){
  var articleHtml =
			"<script id='entry-template' type='text/x-handlebars-template'></script>"+
			"<head>"+

			"<!-- Global site tag (gtag.js) - Google Analytics -->"+
			"<script async src='https://www.googletagmanager.com/gtag/js?id=UA-100076603-1'></script>"+
			"<script>"+
			  "window.dataLayer = window.dataLayer || [];"+
			  "function gtag(){dataLayer.push(arguments);}"+
			  "gtag('js', new Date());"+

			  "gtag('config', 'UA-100076603-1');"+
			"</script>"+

	    "<meta property='og:site_name' content='North by Northwestern Year in Media 2017' />"+
	    "<meta property='fb:app_id' content='829210430557671'/>"+
			"<meta property='og:url'                content='http://apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/' />"+
	    "<meta property='og:type' content='article' />"+
	    "<meta property='og:title' content='{{hed}}' />"+
	    "<meta property='og:image' content='http:'apps.northbynorthwestern.com/magazine/2017/fall/{{section}}/{{slug}}/cover_2000.jpg' />"+
	    "<meta name='author' content='{{author}}' />"+
	    "<meta name='twitter:card' content='summary_large_image' />"+
	    "<meta name='twitter:site' content='@nbn_tweets' />"+
	    "<meta charset='utf-8'/>"+
	    "<meta name='viewport' content='width=device-width+ initial-scale=1'>"+

	    "<title>{{title}} | North by Northwestern Year in Media 2017</title>"+

	   	"<link rel=stylesheet href='http://apps.northbynorthwestern.com/hungry/styles/22738433.main.css'>"+
	    "<link rel='stylesheet' href='../../universal.css'>"+
	    "<link rel='stylesheet' href='style.css'>"+
			"<style>"+
				"article header.article-meta {"+
						"background-color: #A5A69D;"+
						"background-image: url({{media_link}});"+
						"background-size: cover;"+
						"background-repeat: no-repeat;"+
						"background-position: 30% 0;"+
						"height: 100%;"+
						"min-height: 1000px;"+
						"color: white;"+
						"text-shadow: 0 0 10px black;"+
						"padding-top: 650px;"+
				"}"+
			"</style>"+
	"</head>"+
	"<body>"+
    "<header class='masthead masthead-down'>"+
        "<div class='logo'>"+
            "<a href='//apps.northbynorthwestern.com/magazine/2017/fall/'><img class=nbn-logo src='http://nbn-housing.s3.amazonaws.com/static/img/nbn-logo.png' alt=''></a>"+
        "</div>"+
		"</header>"+
		"<main>"+
        "<a id='top'></a>"+
        "<article>"+
            "<header class='article-meta'>"+
                "<div class='headline'>"+
                    "<h1 class='hed'>{{hed}}</h1>"+
                		"<h3 class='byline'><a href='{{byline_url}}' target='_blank'>{{author}}</h3>"+
                "</div>"+
                "<p class='photo-byline byline'>Image by <a href='{{media_author_url}}' target='_blank'><b>{{media_byline}}</b></a> / North by Northwestern</p>"+
            "</header>"+

            "<div class='blackboard'>"+
                "<p class='lead'>{{article_lead}}</p>"+
                "<div class='articlebody'>{{article_body}}</div>"+
            "</div>"+
        "</article>"+
				"</main>"+

				"<footer class='nbn-footer'>"+
				"<div class='footer-block'>"+
				"<div class='footer-item footer-left'>"+
				    "<p>Produced by <b>Maxine Whitely and Audrey DeBruine</b> for North by Northwestern</p>"+
				"</div>"+
				"<div class='footer-item footer-center footer-links'>"+
				    "<a data-scroll data-options='{'updateURL': false}' href='#top'>Back to top</a>"+
				    "<a href='../../index.html'> &laquo; Back to Year in Media </a>"+
				"</div>"+
				"<div class='footer-item footer-right'>"+
				    "<p>&copy; North by Northwestern, December 30, 2017.</p> <p>All rights reserved.</p>"+
				"</div>"+
				"</div>"+
				"</footer>"+
	"</script>"

  console.log("yo yo")
  var stories = copy.stories;
  var storytemp = Handlebars.compile(articleHtml);

  for (var x = 0; x < stories.length; ++x) {
    var context = {
      hed: stories[x]['hed'],
      slug: stories[x]['slug'],
      author: stories[x]['author'],
      lead: stories[x]['lead'],
      story: stories[x]['story'],
      link: 'http://apps.northbynorthwestern.com/year-in-media/2017/' + stories[x]['slug'],
      index: x+1,
    }  

    //create the directory if not already created
    var dir = './dist/'+context.slug;
    mkdirp.sync(dir, function (err) {
      if (err) console.error(err)
      else console.log('pow!')
    });

    //create an html file in the directory
    var fileName = './dist/'+context.slug+'/index.html';
    var stream = fs.createWriteStream(fileName);
    if (context.media_type == 'photo'){
      var imgResult = imgTemplate(context);
      var prettifiedImgResult = prettifyHtml(imgResult);
      stream.write(prettifiedImgResult);
      stream.end();
    }
    \\
  }

  function onLoad(data, tabletop) {
    copy = data;
    stories = copy.BUDGET.elements;
    // formatted = [];
    var imgTemplate = Handlebars.compile(imgHtml);
    var vidTemplate = Handlebars.compile(vidHtml);

    for (var x = 0; x < stories.length; ++x) {
      var context = {
        section: stories[x]['SECTION'],
        slug: stories[x]['STORY-SLUG'],
        title: stories[x]['HED'],
        subtitle: stories[x]['DEK'],
        byline: stories[x]['BYLINE'],
        byline_url: stories[x]['AUTHOR-LINK'],
        media_type: stories[x]['TOP-GRAPHIC-TYPE'],
        media_link: stories[x]['MEDIA-LINK'],
        media_byline: stories[x]['MEDIA-BYLINE'],
        media_author_url: stories[x]['MEDIA-AUTHOR-LINK'],
        front_preview: stories[x]['FRONT-PREVIEW'],
        article_lead: stories[x]['ARTICLE-LEAD'],
        article_body: stories[x]['ARTICLE-BODY'],

        related_left_link: stories[x]['RELATED-LEFT-LINK'],
        related_left_hed: stories[x]['RELATED-LEFT-HED'],
        related_left_byline: stories[x]['RELATED-LEFT-BYLINE'],
        related_left_date: stories[x]['RELATED-LEFT-DATE'],
        related_right_link: stories[x]['RELATED-RIGHT-LINK'],
        related_right_hed: stories[x]['RELATED-RIGHT-HED'],
        related_right_byline: stories[x]['RELATED-RIGHT-BYLINE'],
        related_right_date: stories[x]['RELATED-RIGHT-DATE']
      }
      // formatted.push(context);

      //create the directory if not already created
      var dir = './dist/'+context.section+'/'+context.slug;
      mkdirp.sync(dir, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
      });

      //create an html file in the directory
      var fileName = './dist/'+context.section+'/'+context.slug+'/index.html';
      var stream = fs.createWriteStream(fileName);
      if (context.media_type == 'photo'){
        var imgResult = imgTemplate(context);
        var prettifiedImgResult = prettifyHtml(imgResult);
        stream.write(prettifiedImgResult);
        stream.end();
      }
      else if (context.media_type == 'video'){
        var vidResult = vidTemplate(context);
        var prettifiedVidResult = prettifyHtml(vidResult);
        stream.write(prettifiedVidResult);
        stream.end();
      }
    }
  }
