let modules;
let db;

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  // init modules
  modules = new Modules();
  // init Firebase
  initDatabase();

}

function draw() {
  //twiddle your thumbs  
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  modules.updateBackground();
}
