
function initDatabase(){
    var firebaseConfig = {
        apiKey: "AIzaSyA44aV3SXeV_6SwYFLuy3FEetYjly2E6co",
        authDomain: "m5stack-8f1cb.firebaseapp.com",
        databaseURL: "https://m5stack-8f1cb.firebaseio.com",
        projectId: "m5stack-8f1cb",
        storageBucket: "m5stack-8f1cb.appspot.com",
        messagingSenderId: "239437367474",
        appId: "1:239437367474:web:3ce100088dc0e0a02b21ab",
        measurementId: "G-XK2XR6DNHE"
        };
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    this.getInstructions();
}

async function getInstructions(){
    let ref = db.ref('Maak-Machines/Block-Simulator/Instructions');
    await ref.on('value', gotInstructions, errData);
}

async function getBlocks(){
    const eventref = db.ref('Maak-Machines/Modules');
    const snapshot = await eventref.once('value', gotBlocks, errData);
}

async function getMachineProperties(){
    const eventref = db.ref('Maak-Machines/Config/BedSize');
    const snapshot = await eventref.once('value', gotMachine, errData);
}


async function getCanvas(){
    let ref = db.ref('Maak-Machines/Design-Simulator/SVG');
    await ref.on('value', gotCanvas, errData);
}

function gotInstructions(data) {
    canvas.setDataInstructions(data);
    this.getBlocks();
}

function gotBlocks(data) {
    canvas.setDataBlocks(data);
    this.getMachineProperties();
}

function gotMachine(data) {
    canvas.drawMachineBed(data);
    this.getCanvas();
}

function gotCanvas(data) {
    canvas.drawSVG(data);
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}
