
var chai = require("chai");
chai.should();


var m2e = require("../");

describe("Markdown 2 Exercise Converter", function(){

  it("creates a valid exercise object", function(){
    var exercise = m2e("");
    exercise.should.be.a("object");
    exercise.should.have.property("tasks");
    exercise.should.have.property("solution");
    exercise.should.have.property("tests");
    exercise.should.have.property("title");
  });

  it("extracts the first heading element as the title", function(){
    var exercise = m2e("# Title");
    exercise.title.should.equal("Title");
  });

  it("complains about multiple titles", function(){
    var exercise = m2e("# Title1\n# Title2");
    exercise.error.should.be.an("object");
    exercise.error.data.should.have.length(2);
  });
});
