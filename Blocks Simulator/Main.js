let modules;
let db;

let buttonCreate;
let buttonReset;
let inputName;
let inputData;

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  // init modules
  let size = new createVector(100,100);
  modules = new Modules(size);
  // init Firebase
  initDatabase();
 /* button = createButton('Reset positions');
  button.style('background-color', color(255));
  button.style('border-radius', '8px');
  button.style('padding', '0.35em 1.2em');
  button.style('border' , '0.1em solid #FFFFFF');

  button.position(19, 19);
  button.mousePressed(clearPositions);*/
  /*buttonCreate = createButton('Create Module');
  buttonReset = createButton('Reset Positions');

  buttonCreate.position(65, 65);
  buttonReset.position(65, 120);
  addButtonStyle(buttonCreate);
  addButtonStyle(buttonReset);
  
  buttonReset.mouseOver( function () { buttonReset.style('border' , '0.1em solid #FF0000')}).mouseOut( function () {buttonReset.style('border' , '0.1em solid #000000')}).mouseReleased(function () {buttonReset.style('border' , '0.1em solid #000000')});
  buttonCreate.mouseOver( function () { buttonCreate.style('border' , '0.1em solid #FF0000')}).mouseOut( function () {buttonCreate.style('border' , '0.1em solid #000000')}).mouseReleased(function () {buttonCreate.style('border' , '0.1em solid #000000')});
  
  buttonReset.mousePressed(clearPositions);
  buttonCreate.mousePressed(addModule);
  inputName = createInput();
  inputName.position(65, 150);
  inputName.hide();
  inputData = createInput();
  inputData.position(65, 200);
  inputData.size(150,200);
  inputData.hide();*/
  
}

function draw() {
  background(255);
  createGrid();
  modules.display();
}


function addButtonStyle(btn){
  btn.style('background-color', color(255));
  btn.style('border-radius', '8px');
  btn.style('padding', '0.95em 1.2em');
  btn.style('border' , '0.1em solid #000000');
}

function addModule(){
  buttonReset.position(65, 450);
  buttonCreate.style('border' , '0.1em solid #00FF00');
  buttonCreate.style('outline', '0');
  inputName.show();
  inputData.show();
  console.log("add module");
}

function clearPositions(){
  console.log("clear");
  buttonReset.style('border' , '0.1em solid #00FF00');
  buttonReset.style('outline', '0');
}

function mousePressed() {
  modules.mousePressed();
}
function mouseDragged() {
  modules.mouseDragged();
}

function mouseReleased() {
  modules.mouseReleased();
}

function createGrid(){
  columns = windowWidth/100;
  rows = windowHeight/100;

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      fill(color(220,220,220))
      push();
      translate(i*100, j*100);
      rect(4,0,1,10);
      rect(0,4,10,1);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createGrid();
}
