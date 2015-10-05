
var getInlineBlock = function(tokens, idx) {
  return tokens[idx+1];
}

module.exports = function(tokens, level){
  var res = [];
  for(var i=0; i<tokens.length; i++){
    if(tokens[i].tag == "h"+level && tokens[i].type == "heading_open"){
      res.push(getInlineBlock(tokens, i));
    }
  }
  if(res.length == 0){
    return {title: "", error: {message: "No title found"} };
  } else if(res.length > 1){
    return {title: res[0].content, error: {message: "Multiple title objects found", data:res} };
  } else {
    return {title: res[0].content};
  }
}
