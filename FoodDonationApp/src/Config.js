import * as firebase from 'firebase';


// Initialize Firebase
const firebaseConfig = {
  	apiKey: "AIzaSyCDNg-6wLAG9uO695FAyMlvWlnjWEBsY50",
    authDomain: "food-donation-bcce1.firebaseapp.com",
    databaseURL: "https://food-donation-bcce1.firebaseio.com",
    projectId: "food-donation-bcce1",
    storageBucket: "food-donation-bcce1.appspot.com",
    messagingSenderId: "474995894111",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
/* export const auth = firebase.auth(); */