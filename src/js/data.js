const GoogleDocToJSON = require('googledoc-to-json');
const fs = require('fs');
const config = require('../configs/config.json').google;
const gDocToJSON = new GoogleDocToJSON(config);

const options = {
    fileId: config.fileId,
    oAuthTokens: config.oAuthTokens,
    output: './src/data/archie.json'
};

gDocToJSON.getArchieML(options, function (err, aml) {
  if (err) {
    console.log('Google doc to JSON ' + err);
    return;
  }

	// create an html file in the directory
  // var fileName = options.output;
	// var stream = fs.createWriteStream(fileName);

  //write archie data to file + console log success
  fs.writeFile(options.output, JSON.stringify(aml, null, '\t'))
  console.log('Google Doc Success: ' + options.fileId + ' written to ' + options.output)
});
