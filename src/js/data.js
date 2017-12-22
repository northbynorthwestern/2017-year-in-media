const GoogleDocToJSON = require('googledoc-to-json');
const fs = require('fs');
const config = require('../configs/config.json').google; // see 'Getting Credentials' below
const gDocToJSON = new GoogleDocToJSON(config);

const options = {
    fileId: '1va9y9OxcShd9rK8dKXLJFnKwUfaQuK6B9FQ2jt7yfTw',
    oAuthTokens: config.oAuthTokens,
    output: './src/data/archie.json'
};

gDocToJSON.getArchieML(options, function (err, aml) {
  if (err) {
    console.log('Google doc to JSON ' + err);
    return;
  }
  fs.writeFile(options.output, JSON.stringify(aml, null, '\t'))
  console.log('Google Doc Success: ' + options.fileId + ' written to ' + options.output)
});
