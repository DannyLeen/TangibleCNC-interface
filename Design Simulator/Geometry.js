class Geometry {
    constructor() {

    }
    createGeometry(tempId, tempName, tempData) {
       
        let moduledata = tempData[tempId];
       // console.log(tempName);
        let returnData;

        if (tempName == "Start") {
            let startPoint = new createVector(moduledata.PositionX, moduledata.PositionY);
            returnData = {name: tempName,  data: {startPoint: startPoint}};
        }

        if (tempName == "Rect Pattern") {
            returnData = {name: tempName,  data: {rectPattern:{AmountX: moduledata.AmountX, AmountY:moduledata.AmountY, SpacingX: moduledata.SpacingX, SpacingY: moduledata.SpacingY }}};
        }
  
        if (tempName == "Circle") {
            returnData = {name: tempName, data: {geometry: jscut.geometry.createCircle(0,0, moduledata.Diameter, 100, 'mm')}};
        }

        if (tempName == "Rectangle") {
            returnData = {name: tempName, data: {geometry: jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Height, 'mm')}};
        }

        if (tempName == "Move") {
            let moveTemp = new createVector(moduledata.x, moduledata.y);
            returnData = { name: tempName, data: {move: moveTemp}};
        }

        if (tempName== "Offset") {
            returnData = {name: tempName, data: {offset: moduledata.Amount, offsetDirection: moduledata.Direction, offsetDepth: moduledata.Depth}};
        }

        if (tempName == "Pocket"){
            returnData = {name: tempName, data: {operation: "Pocket", depth: moduledata.Depth, stepOver: moduledata.StepOver}};
        }
        if (tempName == "Profile"){
            returnData = {name: tempName, data: {operation: moduledata.Direction, depth: moduledata.Depth}};
        }
        if (tempName == "Box"){
            let spacing = 20;
         /*   let a = jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Height, 'mm');
            let b = jscut.geometry.createRect(0, moduledata.Height+ spacing, moduledata.Width, moduledata.Height + moduledata.Height+ spacing, 'mm');
            let c = jscut.geometry.createRect(0, moduledata.Height*2 + (spacing *2), moduledata.Width, moduledata.Height + moduledata.Height*2+ (spacing*2), 'mm');
            let d = jscut.geometry.createRect(0, moduledata.Height*3 + (spacing *3), moduledata.Width, moduledata.Height + moduledata.Height*3+ (spacing*3), 'mm');
            let e = jscut.geometry.createRect(moduledata.Width +spacing, moduledata.Height+ spacing, moduledata.Width*2+spacing, moduledata.Height + moduledata.Height+ spacing, 'mm');
            let f = jscut.geometry.createRect(0, moduledata.Height+ spacing, moduledata.Width, moduledata.Height + moduledata.Height+ spacing, 'mm');*/

            let bottom = jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Depth, 'mm');
            bottom = jscut.geometry.translate(bottom, moduledata.Height + spacing,  moduledata.Height  + spacing, 'mm');

            let sideA = jscut.geometry.createRect(0, 0, moduledata.Height, moduledata.Depth, 'mm');
            sideA = jscut.geometry.translate(sideA, 0,  moduledata.Height + spacing, 'mm');

            let sideB =  jscut.geometry.createRect(0, 0, moduledata.Height, moduledata.Depth, 'mm');
            sideB = jscut.geometry.translate(sideB, moduledata.Width +  moduledata.Height  + (spacing*2), moduledata.Height +spacing, 'mm');

            let sideC =  jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Height, 'mm');
            sideC = jscut.geometry.translate(sideC, moduledata.Height + spacing,  0, 'mm');

            let sideD  = jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Height, 'mm');
            sideD = jscut.geometry.translate(sideD, moduledata.Height + spacing,  moduledata.Height +moduledata.Depth + spacing*2, 'mm');

            let top  = jscut.geometry.createRect(0, 0, moduledata.Width, moduledata.Depth, 'mm');
            top = jscut.geometry.translate(top, moduledata.Height + spacing, moduledata.Height *2 +moduledata.Depth + spacing*3 , 'mm');

            let bSa =  jscut.geometry.union(bottom, sideA);
            let bSaSb =  jscut.geometry.union(bSa, sideB);
            let bSaSbSc =  jscut.geometry.union(bSaSb, sideC);
            let bSaSbScSd =  jscut.geometry.union(bSaSbSc, sideD);
            let bSaSbScSdT =  jscut.geometry.union(bSaSbScSd, top);
            //let l =  jscut.geometry.union(k, f);

            returnData = {name: tempName, data: {geometry: bSaSbScSdT}};
        }

        if(returnData != null){
            return returnData;
        }

        else{
            return "error";
        }
    }

}
