var Handlebars = require("handlebars");
var copy = require('json-loader!../data/archie.json');

// Set up DOM Elements--FROM OL SITE INDEX. use as a template for loading hbs templates
// var upcomingEventsPanelDOM = document.querySelector('#upcoming-events-panel');
// var eventsListFullDOM = document.querySelector('#events-list-full');
// var lightningTalksArchiveDOM = document.querySelector('#lightning-talks-archive');

// Load Handlebars partials--FROM OL SITE INDEX. use as a template for loading hbs templates
// var upcomingEventsPanelTemplate = require("./../templates/partials/events-list-small.hbs");
// var eventsListFullTemplate = require("./../templates/partials/events-list-full.hbs");
// var lightningTalksTemplate = require("./../templates/partials/lightning-talks-archive.hbs");

// Set up global variables
// var moment = require('moment');
// var publicSpreadsheetURL= "https://docs.google.com/spreadsheets/d/14AioGTfHHIRz-u3zoJJeqXq0B66yyq72BCZFXccOhhw/pubhtml";
// var copy = null;
// var staticCopy = require('json-loader!../data/static-copy.json');

var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

function onLoad(data, tabletop) {
    copy = data;
    copy.events = GroupEvents(processEventsSheet(data.events.elements));
    updateDOM();
}


function updateDOM() {
    eventsListFullDOM.innerHTML = eventsListFullTemplate(copy.events);
}
