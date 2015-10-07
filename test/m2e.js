
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
  
  it("can parse the exercise number in the title", function(){
    var exercise = m2e("# Exercise 1");
    exercise.number.should.equal('1');
  });

  it("complains about multiple titles", function(){
    var exercise = m2e("# Title1\n# Title2");
    exercise.internals.error.should.be.an("array");
    exercise.internals.error.should.have.length(1);
  });

  it("creates tasks via subheadings", function(){
    var exercise = m2e("## Task 1\n## Task 2");
    exercise.tasks.should.have.length(2);
  });
  
  it("parses the points for every task", function(){
    var exercise = m2e("## Task 2 (10 Punkte)");
    exercise.tasks[0].maxPoints.should.equal("10");
  });

  it("reads the title of the subheading", function(){
    var exercise = m2e("## Task 1");
    exercise.tasks[0].title.should.equal("Task 1");
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
  });

  it("preserves paragraphs in the exercise text", function(){
    var exercise = m2e("## Task 3\nDo this\n\n\nDo that");
    exercise.tasks[0].text.should.equal("Do this\n\n\nDo that");
  });

  it("preserves listings in the exercise text", function(){
    var exercise = m2e("## Task 2\nA\n - a\n - b\nBla bla");
    exercise.tasks[0].text.should.equal("A\n - a\n - b\nBla bla");
  });

  it("returns a prefilled value for a task if given", function(){
    var exercise = m2e("## Task 2\nTest\n### Prefilled\nAlready there!!");
    exercise.tasks[0].prefilled.should.equal("Already there!!");
  });

  it("returns a prefilled value for the tests if given", function(){
    var exercise = m2e("## Task 2\nTest\n### Tests\nNo testing here!!!");
    exercise.tasks[0].tests.should.equal("No testing here!!!");
  });

  it("returns a prefilled value for the solution if given", function(){
    var exercise = m2e("## Task 2\nTest\n### Solution\nEasy peasy");
    exercise.tasks[0].solution.should.equal("Easy peasy");
  });

  it("can handle mutliple subheadings in one task", function(){
    var exercise = m2e("## Task 3\nText!\n### Prefilled\nNothing\n### Tests\nTests..\n### Solution\nNone");
    exercise.tasks[0].prefilled.should.equal("Nothing");
    exercise.tasks[0].tests.should.equal("Tests..");
    exercise.tasks[0].solution.should.equal("None");
  });

  it("can read tasks with an existing title", function(){
    var exercise = m2e("# Title\n## Task");
    exercise.tasks.should.have.length(1);
  });

  it("assigns a subsection an empty content if the content is empty", function(){
    var exercise = m2e("# Title\n## Task\n### Solution");
    exercise.tasks[0].solution.should.equal("");
  });

  it("can parse subsections with code envirnoments", function(){
    var exercise = m2e("## Task\n### Tests\n```js\nconsole.log('a');\n```");
    exercise.tasks[0].tests.should.equal("```js\nconsole.log('a');\n```");
  });
});
