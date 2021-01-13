
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
            // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        var ref = db.ref('Maak-Machines/Modules');
        ref.on('value', gotData, errData);
    }
    
function gotData (data) {
        var data = data.val();
        var keys = Object.keys(data);
        modules.clear();
        modules.databaseData(keys, data);
    }

function errData(err) {
    console.log('Error!');
    console.log(err);
}


