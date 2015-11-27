var _ = require("lodash");
var mIt = new require("markdown-it")();
var headings = require("./src/headings");
var taskCreator = require("./src/tasks");
var markdownChecker = require("./src/check");

var parseExerciseNumber = function(titleBlock){
  return ((/(\d+)/).exec(titleBlock) || [])[1];
}

var m2e = function(markdown){
  var tokens = mIt.parse(markdown);
  var errors = [];

  titleObj = headings.title(tokens, errors);
  tasks = headings.tasks(tokens, titleObj.end).map(function(t){ return taskCreator(markdown, tokens, t); });
  _.forEach(tasks, function(t, idx) {
      t.number = idx + 1;
  });

  return {
    title: titleObj.block.content,
    number: parseExerciseNumber(titleObj.block.content),
    tasks: tasks,
    internals: {
      error: errors,
      source: markdown
    }
  };
};

m2e.check = markdownChecker;

module.exports = m2e;
