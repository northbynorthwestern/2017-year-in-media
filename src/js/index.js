var Handlebars = require("handlebars");
var copy = require('../data/archie.json');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prettifyHtml = require('prettify-html');

//Load Handlebars partials
var storyWindowTemplate = require("./../templates/partials/event-window.hbs");


// Set up DOM Elements--FROM OL SITE INDEX. use as a template for loading hbs templates
// var upcomingEventsPanelDOM = document.querySelector('#upcoming-events-panel');
// var eventsListFullDOM = document.querySelector('#events-list-full');
// var lightningTalksArchiveDOM = document.querySelector('#lightning-talks-archive');

// Load Handlebars partials--FROM OL SITE INDEX. use as a template for loading hbs templates
// var upcomingEventsPanelTemplate = require("./../templates/partials/events-list-small.hbs");
// var eventsListFullTemplate = require("./../templates/partials/events-list-full.hbs");
// var lightningTalksTemplate = require("./../templates/partials/lightning-talks-archive.hbs");
// var storyWindowTemplate = require("./../templates/partials/event-window.hbs");

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
function runIt(copy, error){
  var stories = copy.stories;
  var storytemp = Handlebars.compile(storyWindowTemplate);
  var dir = '../../out/';
  mkdirp.sync(dir, function (err) {
      if (err) console.error("err")
      else console.log('pow!')
  });
  var fileName = '../../out/index.html';
  var stream = fs.createWriteStream(fileName);

  for (var x = 0; x < stories.length; ++x) {
    var context = {
      hed: stories[x]['hed'],
      author: stories[x]['author'],
      lead: stories[x]['lead'],
      story: stories[x]['story']
    }

		var storywindow = prettifyHtml(storytemp(context));
		// var storywin = prettifyHtml(storywindow);
		stream.write(storywindow);
		stream.end();
    if (error){
      console.log("error!!")
    }
  }
}



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
