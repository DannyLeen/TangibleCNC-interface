class Modules{
    constructor(size) {
        this.size = size;
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
        this.setPosInFirebase(moduleObj);
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

    async databaseData(keys, data){

        for (let i = 0; i < keys.length; i++) {
            let name = keys[i];
            //console.log(name);
            let elements = Object.keys(data[name]);
           /* for (let j = 0; j < size; j++) {
                Object.keys(data[id]);
            }*/
           // console.log(data[id]);
           for (let element in elements) {
               let uid = elements[element];
               //console.log(uid);
                //console.log(data[name][uid]);
                var ref = db.ref('Maak-Machines/Block-Simulator/Position/' + name + '/' + uid);
                await ref.once('value', posData => {
                    let posX = posData.val().PositionX;
                    let  posY = posData.val().PositionY;
                   // console.log(posData);
                    let position = createVector(posX, posY);
                    //let position = this.createPosition(name);
                    this.createModule(uid, name, position, data[name]);
                   
                  //  console.log("create: " + name);
                });
 
            }
       
           // var dataVal = data.val();
            //var keys = Object.keys(dataVal);
        /*    for (let j = 0; j < data.length; j++) {
            let name = keys[j];
            let position = this.createPosition(name);
            this.createModule(name, position,data)*/
         }
         this.findConnectedModules();
       //  
    }

    display(){
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
    }

    mouseDragged(){
        let id = this.moveId;
        if(id != -1 ){
            this.modules[id].position.x = mouseX -  (this.modules[id].size.x/2);
            this.modules[id].position.y = mouseY -  (this.modules[id].size.y/2);
            this.modules[id].setBorderColor(color(235, 204, 0));
            this.hitModule = false;
        }
    }

    mouseReleased(){

        let id = this.moveId;
        if(id != -1){
            this.modules[id].setBorderColor(color(0));
            this.modules[id].position.x = int((this.modules[id].position.x +(this.size.x/2) ) /this.size.x)*this.size.x;
            this.modules[id].position.y = int((this.modules[id].position.y +(this.size.y/2) )/this.size.y)*this.size.y;
            this.setPosInFirebase(this.modules[id]);
           
            this.moveId = -1;
            this.executeComplete = true;
        }
        this.findConnectedModules();
    }

    setPosInFirebase(module){
        var ref = db.ref('Maak-Machines/Block-Simulator/Position/' + module.name + '/' + module.uid);
        let data = {
            PositionX: module.position.x,
            PositionY: module.position.y
        }
        ref.set(data);
    }
    
    findConnectedModules(){
        let len = this.modules.length;
        let startPos = this.findStartModule();
        let offset = this.size.x;
        let counter = 0;
        let modulesOrderByName = [];
        let consecutive = []; 
      //  console.clear();
        for (let i = 0; i < len; i++) {
            
            if (startPos.y == this.modules[i].position.y){
               let data = {
                   arrayIndex: i,
                   data: this.modules[i]
               }
                consecutive.push(data);
            }

        }
        let sortedArray = this.findConsecutive(consecutive);

       

        if(sortedArray != undefined){
            let lenOrder = sortedArray.length;
            
            for (let j = 0; j < lenOrder; j++){
               // console.log(j + " " + sortedArray[j].data.name);   

                let data = {
                    id: sortedArray[j].data.uid,
                    name: sortedArray[j].data.name
                }
                
                for(let module in this.modules){
                    if(this.modules[module].uid == sortedArray[j].data.uid){
                        this.modules.splice(module, 1);
                       // console.log("remove" + sortedArray[j].data.name);
                    }

                }
              //  console.log('push ' + sortedArray[j].data.name);
                this.modules.push(sortedArray[j].data);
               // console.log(this.modules[sortedArray[j].arrayIndex].name)
               //
              //  this.modules.push();*/
                modulesOrderByName.push(data);
            }
            this.sendToFirbase(modulesOrderByName);
        }
    }

    findConsecutive(numbers){
        numbers.sort(function(a, b){return a.data.position.x-b.data.position.x});
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
    
    clearInstructions(){
        var ref = db.ref('Maak-Machines/Block-Simulator/Instructions');
        ref.set(['Start']);
    }

    sendToFirbase(objectArray){
        var ref = db.ref('Maak-Machines/Block-Simulator/Instructions');
  	    ref.set(objectArray);
    }

    calculateNext(prevPos, offset){
        prevPos -= offset;
        return prevPos
    }

    findStartModule(){
        let len = this.modules.length;
        let startPos;
        for (let i = 0; i < len; i++) {
            if(this.modules[i].name == "Start"){
                startPos = this.modules[i].position;
            }
        }
        return startPos;
      
    }
}

