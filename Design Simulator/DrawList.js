class DrawList {
    constructor() {
        this.itemList = [];
        this.move = new createVector(0, 0);
        this.offset;
        this.offsetDirection;
        this.offsetId;
        this.offsetDepth;
       // this.geometryIds = [];
        this.startId = 0
    }

    addItemToList(item) {
        this.itemList.push(item);
    }

    clearItemList() {
        this.itemList = [];
        this.move.x = 0;
        this.move.y = 0;
        this.offset = 0;
        this.offsetId = null;
        this.generateCamPath = null;
        this.startId = null;
    }

    getItemList() {
        return this.itemList;
    }

    
    unionAll() {
        var clipper = new ClipperLib.Clipper();
        clipper.AddPaths(this.itemList[0], ClipperLib.PolyType.ptSubject, true);
        for (let item = 1; item < this.itemList.length; item++) {
            console.log( item);
            clipper.AddPaths(this.itemList[item], ClipperLib.PolyType.ptClip, true);
        }
        var result = [];
        clipper.Execute(ClipperLib.ClipType.ctUnion, result, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);

        return result;
    }

    offsetGeometry(){
        let maxDepth = int(this.offsetId) + int(this.offsetDepth);
        let lastItem; 
        //console.log("offset");
        for (let item = 0 ; item < this.geometryIds.length; item++) {
            if(this.geometryIds[item] > this.offsetId && this.geometryIds[item] <= maxDepth){

                let result = jscut.geometry.grow(this.itemList[item], this.offset, 'mm', 'square');
                canvas.addToSvg({fill:'none', stroke:'#00ff00', 'stroke-width':'3'}, result);
                let lastItem = item;
                //this.itemList[item]);
               // this.itemList.splice(item, 1);
                //this.geometryIds.splice(item, 1);
               
               // this.itemList.push(result);
                
            }
        }
       // this.itemList.splice(this.offsetId, this.geometryIds[lastItem] - this.offsetId, );
       // console.log(this.geometryIds);
    }
}