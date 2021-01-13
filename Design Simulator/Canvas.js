class Canvas {
    constructor() {
        this.density = displayDensity();
        this.geometry = new Geometry();
        this.startPoint;
        this.started = false;
        this.machineSize = new createVector(610, 600);
        this.cam = new Cam();
        this.instructions;
        this.blocks;
    }

    setDataInstructions(data) {
        this.instructions = data.val();
    }

    setDataBlocks(data){
        this.blocks = data.val();
        this.parseData();
    }

    parseData(){
        var svg = document.querySelector('svg');
        jscut.svg.clear(svg);
        var refTemp = db.ref('Maak-Machines/Design-Simulator/');
        refTemp.child('SVG').remove();
        let data = [];
        for(let instruction in this.instructions){
            for(let name in this.blocks){
                let keys = Object.keys(this.blocks[name]);
                //console.log(keys);
                for(let key in keys){
                    if(keys[key] == this.instructions[instruction].id){
                         data[instruction] = {
                            Uid: keys[key],
                            Instruction:this.geometry.createGeometry(keys[key], name, this.blocks[name])
                         } 
                     }
                }
            } 
        }
        this.setGeometryFirebase(data);
    }

    setGeometryFirebase(data){
        var ref = db.ref('Maak-Machines/Design-Simulator/SVG/ActiveBlocks/');
        ref.set(data);
    }

    drawMachineBed(size) {
        var r2 = jscut.geometry.createRect(-250, -250, size.val().Width +250, size.val().Height +250, 'mm');
        this.addToSvg({
            fill: 'LightGray',
            stroke: '#000000',
            'stroke-width': '1'
        }, r2);
        var r1 = jscut.geometry.createRect(0, 0, size.val().Width, size.val().Height, 'mm');
        this.addToSvg({
            fill: 'White',
            stroke: '#000000',
            'stroke-width': '20'
        }, r1);

    }

    displayList() {
     /*   if (drawList.itemList.length >= 1) {
            let paths = drawList.unionAll();
            if (drawList.generateCamPath != null) {
                this.cam.generateCamPath(paths);
            }
            this.addToSvg({
                fill: 'none',
                stroke: '#000000',
                'stroke-width': '10'
            }, paths);
        }*/
    }

    drawSVG(data){
      let activeBlocks = data.val();
      let move = createVector(0,0);
      let startPoint = createVector(0,0);
      let rectPatternSpacing = createVector(0,0);
      let rectPatternAmount= createVector(1,1);
      let offset = 0;
      let camOperationData = {}
      let paths = {};

      console.clear();

      for(let activeBlock in activeBlocks){
        for (let blockDataId in activeBlocks[activeBlock]){
            let blockData = activeBlocks[activeBlock][blockDataId];
            for(let tempData in blockData.Instruction.data){
              ///  console.log(tempData);
                if(tempData == "startPoint"){
                    startPoint.x = blockData.Instruction.data.startPoint.x
                    startPoint.y = blockData.Instruction.data.startPoint.y
                }
                if(tempData == "move"){
                    move.x = blockData.Instruction.data.move.x;
                    move.y = blockData.Instruction.data.move.y;
                  //  console.log("move");
                }
                if(tempData == "offset"){
                    console.log(blockData.Instruction.data.offset);
                    offset = blockData.Instruction.data.offset;
                }
                if(tempData == "rectPattern"){
                    rectPatternAmount.x = blockData.Instruction.data.rectPattern.AmountX;
                    rectPatternAmount.y = blockData.Instruction.data.rectPattern.AmountY;
                    rectPatternSpacing.x = blockData.Instruction.data.rectPattern.SpacingX;
                    rectPatternSpacing.y = blockData.Instruction.data.rectPattern.SpacingY;
                }
                if(tempData == "operation"){
                    //console.log(blockData.Instruction.data);
                    camOperationData = blockData.Instruction.data;
    
                    if(paths.length >0){
                        let camPaths = this.cam.generateCamPath(paths,camOperationData);
                    }
                    else{
                        console.log("no paths to cam");
                    }
                    
                }
                if(tempData == "geometry"){
                    let attr = {
                        fill: 'None',
                        stroke: 'Red',
                        'stroke-width': '10'
                    };
                    let gcode; 
                    this.cam.generateHeader();

                    for(let ax = 0;  ax < rectPatternAmount.x; ax++){
                        let offsetX =  ax * rectPatternSpacing.x;
                        for(let ay = 0;  ay < rectPatternAmount.y; ay++){
                        let offsetY =  ay * rectPatternSpacing.y;
                        let result = jscut.geometry.grow(blockData.Instruction.data.geometry, offset, 'mm', 'square');
                        paths = jscut.geometry.translate(result, startPoint.x + move.x + offsetX, startPoint.y + move.y + offsetY, 'mm');
                        this.addToSvg(attr, paths);
                      //  gcode = this.cam.generateGcode(camPaths);
                    }
                  }
              
                 // let gcodeElement = document.getElementById("gcode");
                 // let text = document.createTextNode(gcode);
                  //gcodeElement.appendChild(text);
                }
            }
        }
    }
}

    addToSvg(attrs, geometry) {
        var svg = document.querySelector('svg');
        jscut.svg.addGeometryToSvg(svg, geometry, 90, attrs);
    }
}