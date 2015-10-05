
var mIt = new require("markdown-it")();
var headings = require("./src/headings");

module.exports = function(markdown){
  var tokens = mIt.parse(markdown);

  titleResult = headings(tokens, 1);

  return {
    title: titleResult.title,
    tasks: [],
    tests: [],
    solution: [],
    error: titleResult.error
  };
};
