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

/***************** KNIGHT LAB OPEN LAB SITE SETUP /*****************
Set up DOM Elements--FROM OL SITE INDEX. use as a template for loading hbs templates
var upcomingEventsPanelDOM = document.querySelector('#upcoming-events-panel');
var eventsListFullDOM = document.querySelector('#events-list-full');
var lightningTalksArchiveDOM = document.querySelector('#lightning-talks-archive');

Load Handlebars partials--FROM OL SITE INDEX. use as a template for loading hbs templates
var upcomingEventsPanelTemplate = require("./../templates/partials/events-list-small.hbs");
var eventsListFullTemplate = require("./../templates/partials/events-list-full.hbs");
var lightningTalksTemplate = require("./../templates/partials/lightning-talks-archive.hbs");
var storyWindowTemplate = require("./../templates/partials/event-window.hbs");
/***************** /***************** /***************** */

function runIt(){
  var storyWindTemplate =
    '{{#each sections}}'+
      '<div class="window" id="1">'+
        '<div class="title-bar">'+
          '<div class="close-button"></div>'+
          '<div class="title-bar-name"><a href="{{slug}}">{{hed}}</a></div>'+
        '</div>'+
        '<div class="window-content">'+
          '<p id="article-deck">{{lead}}</p>'+
          '<p id="article-auth">By {{author}}</p>'+
          '<p id="article-link"><a href={{slug}}>Go >></a></p>'+
        '</div>'+
      '</div>'+
    '{{/sections}}'

  console.log("yo")
  var stories = copy.stories;
  var storytemp = Handlebars.compile(storyWindowTemplate);

  const dir = '../../out/';
  console.log("Made dir")
  mkdirp.sync(dir, function (err) {
      if (err) console.error("err")
      else console.log('pow!')
  });
  const fileName = '../../out/index.html';
  var stream = fs.createWriteStream(fileName);

  var context = copy;

  // for (var x = 0; x < stories.length; ++x) {
  //   var context = {
  //     hed: stories[x]['hed'],
  //     slug: stories[x]['slug'],
  //     author: stories[x]['author'],
  //     lead: stories[x]['lead'],
  //     story: stories[x]['story'],
  //     link: 'http://apps.northbynorthwestern.com/year-in-media/2017/' + stories[x]['slug']
  //   }

		// var storywindow = prettifyHtml(storytemp(context));
    var storywindow = storytemp(context);
    var storywin = prettifyHtml(storywindow);
		stream.write(storywin);
		stream.end();
  }
}

runIt()



//////////////
//registers handlebars partials -- FROM OL SITE

// var globby = require('globby'),
//     fs = require('fs-extra');
// var getPartial = function(Handlebars, rootPath) {
//   globby.sync(rootPath + '*.hbs').forEach(function(file) {
//     var partialName = file.replace(rootPath, "").replace(".hbs", "");
//     Handlebars.registerPartial(partialName, fs.readFileSync(file, "utf8"));
//   })
// }
// module.exports = {
//   getPartial: getPartial
// }
//
// // runs this function
// getPartial(Handlebars, './../templates/partials/');
// //////////////
//
// function onLoad(data, tabletop) {
//     copy = data;
//     copy.events = GroupEvents(processEventsSheet(data.events.elements));
//     updateDOM();
// }
//
//
// function updateDOM() {
//     eventsListFullDOM.innerHTML = eventsListFullTemplate(copy.events);
// }
//
// $('body').append(template(data)); //jQuery

// Set up global variables
// var moment = require('moment');
// var publicSpreadsheetURL= "https://docs.google.com/spreadsheets/d/14AioGTfHHIRz-u3zoJJeqXq0B66yyq72BCZFXccOhhw/pubhtml";
// var copy = null;
// var staticCopy = require('json-loader!../data/static-copy.json');


// ???
/******* var source = document.getElementById("entry-template").innerHTML; *****/
/******* jQuery version: var source = $("#some-template").html(); *****/
/******* var template = Handlebars.compile(source); *****/
// ???
