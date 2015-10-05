
var headings = require("./headings")

module.exports = function(tokens, taskToken){
  var subheadings = headings.subheadings(tokens, taskToken.end+1);
  var startParagraph = taskToken.end + 1;
  if(startParagraph >= tokens.length){
    return {text:""};
  }
  var endParagraph;
  if(subheadings.length > 0){
    endParagraph = subheadings[0].start - 1;
  } else {
    endParagraph = tokens.length - 1;
  }

  return {
    text: tokens[startParagraph+1].content
  };
}
