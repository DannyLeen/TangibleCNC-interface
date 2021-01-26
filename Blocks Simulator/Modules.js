class Modules{
    constructor() {
        this.size =  new createVector(100,100);;
        this.spacing = 10;
        this.posX = 100;
        this.posY = 100; 
        this.mouseHit = false;
        this.hitModule = false;
        this.moveId = -1;
        let modulesArray = [];
        this.modules = modulesArray;
        this.executeComplete = true;
        this.startPosition = createVector(500,300);
        this.background = new Background();
        this.database = new Database();
    }
    clear(){
        this.modules = [];
        this.posY = 100;
    }


    addToModules(moduleObj){
        append(this.modules, moduleObj);
    }

    createModule(uid, name,position, data){
     
        let moduleObj = new Module(uid, name,position, this.size, data); 
        this.database.setPosInFirebase(moduleObj);
        this.addToModules(moduleObj);
        
    }

    resetPosition(name){
        let position;
        //this.posY = 0;
        if(name != "Start"){
            position = createVector(this.posX, this.posY);
            this.posY += this.size.y ;
        }
        else{
            position = this.startPosition;
        }
        return position 
    }


    display(){
        this.updateBackground();
        let len = this.modules.length;
        for (let i = 0; i < len; i++) {
          this.modules[i].display();
        }
        
    }

    mousePressed(){
      
        let len = this.modules.length;
        
        for (let i = 0; i < len; i++) {
            this.mouseHit = collidePointRect(mouseX, mouseY, this.modules[i].position.x , this.modules[i].position.y, this.modules[i].size.x, this.modules[i].size.y);
            if (this.mouseHit){
                this.moveId = i;
                if(this.modules[i].name != "Start"){
                    this.modules[i].setBorderColor(color(235, 204, 0));
                  //  this.modules.push(this.modules.splice(i, 1)[0]);
                }
                if(this.modules[i].name == "Start" && this.executeComplete){
                    this.modules[i].setBorderColor(color(122, 204, 0));
                    console.log("execute");
                    this.executeComplete = false;
                }
            }
        }
        this.display();
    }

    mouseDragged(){
        let id = this.moveId;
        if(id != -1 ){
            this.modules[id].position.x = mouseX -  (this.modules[id].size.x/2);
            this.modules[id].position.y = mouseY -  (this.modules[id].size.y/2);
            this.modules[id].setBorderColor(color(235, 204, 0));
            this.hitModule = false;
        }
        this.display();
    }

    mouseReleased(){

        let id = this.moveId;
        if(id != -1){
            this.modules[id].setBorderColor(color(0));
            this.modules[id].position.x = int((this.modules[id].position.x +(this.size.x/2) ) /this.size.x)*this.size.x;
            this.modules[id].position.y = int((this.modules[id].position.y +(this.size.y/2) )/this.size.y)*this.size.y;
            this.database.setPosInFirebase(this.modules[id]);
           
            this.moveId = -1;
            this.executeComplete = true;
        }
        this.findConnectedModules();
    }

    
    findConnectedModules(){
        this.modules.sort(this.sortByPosition);
        for(let module in this.modules){
            this.database.setPosInFirebase(this.modules[module]);
        }
        this.findModulePosition();
        this.display();
    }

    sortByPosition(a, b){
        if (a.position.y == b.position.y) return a.position.x - b.position.x;
        return a.position.y - b.position.y || a.position.x - b.position.x;
      }

  /*  calculateNext(prevPos, offset){
        prevPos -= offset;
        return prevPos
    }
*/
    findModulePosition(){
        let len = this.modules.length;
        let tempInstructions = [];
        let prev = 0;
        let counter = 0;

        let startPos;
        console.clear();
        for (let i = 0; i < len; i++) {
            if(this.modules[i].name == "Start"){
                prev =  this.modules[i].position.x;
                for (let j = 0; j < len; j++) {
                    if(this.modules[j].position.y == this.modules[i].position.y && this.modules[j].position.x > this.modules[i].position.x)
                    {   
                        if(this.modules[j].position.x  - prev == 100){
                            let data = {
                                id: this.modules[j].uid,
                                name: this.modules[j].name
                                }
                            tempInstructions.push(data);
                        }
                        else{
                            break;
                        }
                        prev = this.modules[j].position.x;
                        
                    }
                }
            }
            this.database.sendToFirbase(tempInstructions);
        }
    }


findConsecutive(numbers){

let chunks = [];
let prev = 0;
numbers.forEach((current) => {
if ( current.data.position.x - prev != 100 ) chunks.push([]);
if(chunks.length == 0){
chunks[chunks.length].push(current);
}
else{
chunks[chunks.length - 1].push(current);
}
prev = current.data.position.x;
});

chunks.sort((a, b) => b.length - a.length);
return chunks[0];
}

    updateBackground(){
        this.background.createGrid();
    }
    
}

