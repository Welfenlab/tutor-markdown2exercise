
var getInlineBlock = function(tokens, idx) {
  return tokens[idx+1];
}

var blockEnd = function(tokens, i, nesting){
  var newNesting = tokens[i].nesting + nesting;
  if(newNesting == 0){
    return i;
  } else {
    return blockEnd(tokens, i+1, newNesting);
  }
}

var getHeadings = function(tokens, level, start){
  start = start || 0;
  var res = [];
  var i = start;
  while(i<tokens.length){
    if(tokens[i].tag == "h"+level && tokens[i].type == "heading_open"){
      end = blockEnd(tokens, i+1, 1);
      res.push({start: i, end: end, block: getInlineBlock(tokens, i)});
      i = end;
    } else if(tokens[i].type == "heading_open" && tokens[i].tag[1] < level){
      // leave loop if this heading is on a higher level
      break;
    }
    i++;
  }
  return res;
}

module.exports = {
  title: function(tokens, errors) {
    var res = getHeadings(tokens, 1);
    if(res.length == 0){
      errors.push({message: "No title found"});
      return "";
    } else if(res.length > 1){
      errors.push({message: "Multiple title objects found", data:res});
      return res[0].block.content;
    } else {
      return res[0].block.content;
    }
  },
  tasks: function(tokens, errors) {
    return getHeadings(tokens, 2);
  },
  subheadings: function(tokens, idx){
    return getHeadings(tokens, 3, idx);
  }
};
