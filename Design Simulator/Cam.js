class Cam {
    constructor() {
        this.material = {
            units: "mm",
            thickness: "18",
            clearance: "12",
        };

        this.tool = {
            units: "mm",
            diameter: "12"
        };
        this.operation = {
            camOp: "None",
            combineOp: "Union"
        };
        this.gcodeOptions = {
            units: 'mm'
        };
        this.gcode;
    }

    generateCamPath(camPaths, camOperationData) {
        var svg = document.querySelector('svg');
        this.operation.camOp = camOperationData.operation;
        this.operation.units = this.material.units;
        this.operation.cutDepth = camOperationData.depth;
        this.operation.geometries = camPaths;

        var camPathOp = jscut.cam.getCamPaths(this.operation, this.tool);
       // let tcamPathOp = jscut.cam.toSvgPathData(camPathOp, 90);

       // var camPathOp = jscut.Cam.generateCamPath(camPaths,this.operation);
      //  console.log(camPathOp[0].path);
        

        jscut.svg.addCamPathsToSvg(svg, camPathOp, 90, {
            fill: 'none',
            stroke: 'green',
            'stroke-width': '10'
        });

        return camPathOp;
    }
    generateHeader() {
        this.gcode = jscut.cam.getGcodeHeader(this.tool, this.material, this.gcodeOptions);
    }
    generateGcode(camPaths) {
        this.gcode += jscut.cam.getOperationGcode(0, this.operation, this.tool, this.material, this.gcodeOptions, camPaths);
        return this.gcode;
    }
}