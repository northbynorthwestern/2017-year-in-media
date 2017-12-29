var Handlebars = require('handlebars');
var copy = require('../data/archie.json');
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
	    "<link rel='stylesheet' href='../universal.css'>"+
	    "<link rel='stylesheet' href='style.css'>"+
			"<style>"+
				"article header.article-meta {"+
            "background: -webkit-radial-gradient(green 1px, white 1px);"+
            "background-position: 0 0, 80px 80px;"+
            "background-size: 3px 3px;"+
						"height: 300px;"+
						"color: white;"+
						"text-shadow: 0 0 10px black;"+
						"padding-top: 50px;"+
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
                		"<h3 class='byline'>By <a href='{{authorlink}}' target='_blank'>{{author}}</h3>"+
                "</div>"+
            "</header>"+

            "<div class='blackboard'>"+
                "<p class='lead'>{{lead}}</p>"+
                "<div class='articlebody'>{{story}}</div>"+
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
      authorlink: stories[x]['author-link'],
      lead: stories[x]['lead'],
      story: stories[x]['story'],
      link: 'http://apps.northbynorthwestern.com/year-in-media/2017/' + stories[x]['slug'],
      index: x+1,
    }
    //create the directory if not already created
    var dir = './out/'+context.slug;
    mkdirp.sync(dir, function (err) {
      if (err) console.error(err)
      else console.log('pow!')
    })

    //create an html file in the directory
    var fileName = './out/'+context.slug+'/index.html';
    var stream = fs.createWriteStream(fileName);

    var articleResult = storytemp(context);
    var prettifiedResult = prettifyHtml(articleResult);

    stream.write(prettifiedResult);
  }
    stream.end();
}

generateArticles()
