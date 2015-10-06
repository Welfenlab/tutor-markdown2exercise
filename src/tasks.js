
var headings = require("./headings");

var firstLine = function(start, tokens){
  for(var i=start; i<tokens.length; i++){
    if(tokens[i].map){
      return tokens[i].map[0];
    }
  }
}

var lastLine = function(end, tokens){
  for(var i=end; i>=0; i--){
    if(tokens[i].map){
      return tokens[i].map[1];
    }
  }
}

var getParagraphText = function(start, end, tokens, mdLines){
  if(!end){
    end = tokens.length - 1;
  }
  var textLines = mdLines.slice(firstLine(start,tokens), lastLine(end, tokens));
  return textLines.join("\n");
}

var getSectionContent = function(section, tokens, mdLines){
  if(section.start + 2 >= section.end) return "";
  return mdLines.slice(
    firstLine(section.start + 2, tokens),
    lastLine(section.end, tokens)).join("\n");
}

var hasTitle = function(title){
  return function(sub){
    return sub.title.trim() == title;
  }
}

var emptySub = {content:""};

module.exports = function(markdown, tokens, taskToken){
  var subheadings = headings.subheadings(tokens, taskToken.end+1);
  var mdLines = markdown.split("\n");
  var text;
  if(subheadings.length > 0){
    text = getParagraphText(taskToken.end + 1, subheadings[0].start - 1, tokens, mdLines);
  } else {
    text = getParagraphText(taskToken.end + 1, null, tokens, mdLines);
  }

  var subsections = subheadings.map(function(s, index, array){
    return {
      title: s.block.content,
      content: getSectionContent(s.section,tokens,mdLines)
    }
  });

  return {
    title: taskToken.block.content,
    text: text,
    prefilled: (subsections.find(hasTitle("Prefilled")) || emptySub).content,
    tests: (subsections.find(hasTitle("Tests")) || emptySub).content,
    solution: (subsections.find(hasTitle("Solution")) || emptySub).content
  };
}
