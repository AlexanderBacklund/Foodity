import firebase from 'firebase';

var config = {
      databaseURL: "https://food-donation-bcce1.firebaseio.com",
      projectId: "food-donation-bcce1",
    };
    
const Firebase = firebase.initializeApp(config);

export default Firebase;