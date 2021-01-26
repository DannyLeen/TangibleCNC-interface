let modules;

function setup() {

  createCanvas(windowWidth, windowHeight);
  modules = new Modules();

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
