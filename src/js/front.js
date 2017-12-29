var Handlebars = require("handlebars");
var copy = require('../data/archie.json');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

/*
Load Handlebars partials
var storyWindowTemplate = require("./../templates/partials/event-window.hbs");

set up DOM Elements
var entryTemplateDOM = document.querySelector("entry-template")
*/

// Load scripts for webpack bundle
var main = require('./main.js');
var style = require('./style.js')

function generateBody(){
  var storyWindowTemplate =
    // '{{#each sections}}'+
      '<div class="window" id="{{index}}" style="left: {{xyPos}}, top: {{xyPos}}">'+
        '<div class="title-bar">'+
          '<div class="close-button"></div>'+
          '<div class="title-bar-name"><a href="{{link}}">{{hed}}</a></div>'+
        '</div>'+
        '<div class="window-content">'+
          '<p id="article-deck">{{lead}}</p>'+
          '<p id="article-auth">By {{author}}</p>'+
          '<p id="article-link"><a href={{link}}>Go >></a></p>'+
        '</div>'+
      '</div>'
    // '{{/sections}}'

  console.log("yo")
  var stories = copy.stories;
  var storytemp = Handlebars.compile(storyWindowTemplate);

  const dir = './out/';
  console.log("Made dir")
  mkdirp.sync(dir, function (err) {
      if (err) console.error("err")
      else console.log('pow!')
  });
  const fileName = './out/index.html';
  var options = { flags: 'r+', start: 4000 }
  var stream = fs.createWriteStream(fileName, options);

  var stories = copy.stories

  for (var x = 0; x < stories.length; ++x) {
    var context = {
      hed: stories[x]['hed'],
      slug: stories[x]['slug'],
      author: stories[x]['author'],
      lead: stories[x]['lead'],
      story: stories[x]['story'],
      link: 'http://apps.northbynorthwestern.com/year-in-media/2017/' + stories[x]['slug'],
      index: x+1,
      xyPos: (x+1)*50
    }

		// var storywindow = prettifyHtml(storytemp(context));
    var storywindow = storytemp(context);
    var storywin = prettifyHtml(storywindow);
		stream.write(storywin);
		// stream.end();
  }
  stream.end();
}

generateBody()
