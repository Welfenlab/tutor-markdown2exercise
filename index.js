
var mIt = new require("markdown-it")();
var headings = require("./src/headings");
var taskCreator = require("./src/tasks");

var parseExerciseNumber = function(titleBlock){
  return ((/(\d+)/).exec(titleBlock) || [])[1];
}

module.exports = function(markdown){
  var tokens = mIt.parse(markdown);
  var errors = [];

  titleObj = headings.title(tokens, errors);
  tasks = headings.tasks(tokens, titleObj.end).map(function(t){ return taskCreator(markdown, tokens, t); });

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
