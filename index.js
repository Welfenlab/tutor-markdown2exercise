
var mIt = new require("markdown-it")();
var headings = require("./src/headings");
var taskCreator = require("./src/tasks");

module.exports = function(markdown){
  var tokens = mIt.parse(markdown);
  var errors = [];

  title = headings.title(tokens, errors);
  tasks = headings.tasks(tokens).map(function(t){ return taskCreator(markdown, tokens, t); });

  return {
    title: title,
    tasks: tasks,
    error: errors
  };
};
