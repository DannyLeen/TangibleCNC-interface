class Background{
    constructor() {
        this.createGrid();
    }

    createGrid(){
       
        background(255);
       let columns = windowWidth/100;
       let rows = windowHeight/100;
      
        for (let i = 0; i < columns; i++) {
          
          for (let j = 0; j < rows; j++) {
            fill(color(209));
            stroke(color(209));
            strokeWeight(0.1);
            push();
            translate(i*100, j*100);
            rect(4.5,0,1,10);
            rect(0,4.5,10,1);
            pop();
          }
        }
      }   
}