import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDBo6Y-R6t6Ufj71iwEf6qEoHUwuFqEfTs",
    authDomain: "conferences-4f6ad.firebaseapp.com",
    databaseURL: "https://conferences-4f6ad.firebaseio.com",
    projectId: "conferences-4f6ad",
    storageBucket: "conferences-4f6ad.appspot.com",
    messagingSenderId: "469987142891"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;
