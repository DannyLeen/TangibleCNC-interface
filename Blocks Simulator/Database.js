class Database{
    constructor() {
        this.initDatabase();
        this.db;
    }
 initDatabase(){
        let firebaseConfig = {
            apiKey: "AIzaSyA44aV3SXeV_6SwYFLuy3FEetYjly2E6co",
            authDomain: "m5stack-8f1cb.firebaseapp.com",
            databaseURL: "https://m5stack-8f1cb.firebaseio.com",
            projectId: "m5stack-8f1cb",
            storageBucket: "m5stack-8f1cb.appspot.com",
            messagingSenderId: "239437367474",
            appId: "1:239437367474:web:3ce100088dc0e0a02b21ab",
            measurementId: "G-XK2XR6DNHE"
            };
            // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.database();
        let ref = this.db.ref('Maak-Machines/Modules');
        ref.on('value', this.gotData, this.errData);
    }
    
 gotData (data) {
        let dataVal = data.val();
        let keys = Object.keys(dataVal);
        modules.clear();
        modules.database.databaseData(keys, dataVal);
    }

 errData(err) {
    console.log('Error!');
    console.log(err);
}

async databaseData(keys, data){
    let zindex = 0;
    for (let i = 0; i < keys.length; i++) {
        let name = keys[i];
        let elements = Object.keys(data[name]);

       for (let element in elements) {
           let uid = elements[element];

            var ref = this.db.ref('Maak-Machines/Block-Simulator/Position/' + name + '/' + uid);
            await ref.once('value', posData => {
                let posX = posData.val().PositionX;
                let  posY = posData.val().PositionY;
                let position = createVector(posX, posY);
                modules.createModule(uid, name, position, data[name]);
                zindex++;

            });
        }
     }
     modules.findConnectedModules();
}

 sendToFirbase(objectArray){
    var ref = this.db.ref('Maak-Machines/Block-Simulator/Instructions');
    ref.set(objectArray);
}

setPosInFirebase(module){
    var ref = this.db.ref('Maak-Machines/Block-Simulator/Position/' + module.name + '/' + module.uid);
    let data = {
        PositionX: module.position.x,
        PositionY: module.position.y
    }
    ref.set(data);
    
}

/*function clearInstructions(){
    var ref = db.ref('Maak-Machines/Block-Simulator/Instructions');
    ref.set(['Start']);
}*/

}