# 2018-year-in-media

Some notes on the build:
1. we opted for `yarn` instead of `npm`
2. we used [googledoc-to-json](https://github.com/bradoyler/googledoc-to-json) to convert our
Google doc full of content to JSON. You'll need to create a `config.json` file to use it. Read the
package's documentation to get all set up.
3. we generated our content using a weird combo of handlebars and node. We used our Handlebars templates as strings in our JS files because we couldn't get the `.hbs` templates to load/compile properly otherwise. In the future, we'll want to use Handlebars helpers to accomplish this. See the `package.json` for commands to build the output directory

Things to work on:
1. Only generate stuff that doesn't exist/needs to be updated. Don't generate the whole thing
2. Proper Webpack integration
