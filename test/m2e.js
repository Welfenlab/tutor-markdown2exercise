
var chai = require("chai");
chai.should();


var m2e = require("../");

describe("Markdown 2 Exercise Converter", function(){

  it("creates a valid exercise object", function(){
    var exercise = m2e("");
    exercise.should.be.a("object");
    exercise.should.have.property("tasks");
    exercise.should.have.property("title");
  });

  it("extracts the first heading element as the title", function(){
    var exercise = m2e("# Title");
    exercise.title.should.equal("Title");
  });

  it("complains about multiple titles", function(){
    var exercise = m2e("# Title1\n# Title2");
    exercise.error.should.be.an("array");
    exercise.error.should.have.length(1);
  });

  it("creates tasks via subheadings", function(){
    var exercise = m2e("## Task 1\n## Task 2");
    exercise.tasks.should.have.length(2);
  });

  it("extracts the text from the task", function(){
    var exercise = m2e("## Task 1\nDo this!");
    exercise.tasks[0].text.should.equal("Do this!");
  });

  it("extracts multiline text from the task", function(){
    var exercise = m2e("## Task 1\nDo this!\nDo that!\nDo this and that!");
    exercise.tasks[0].text.should.equal("Do this!\nDo that!\nDo this and that!");
  });

  it("returns a markdown string as the exercise text", function(){
    var exercise = m2e("## Task 1\nDo **this** and *that*");
    exercise.tasks[0].text.should.equal("Do **this** and *that*");
  })
});
