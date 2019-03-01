import firebase from 'firebase';

var config = {
      apiKey: "AIzaSyBC43VC9OWU0YEp4Gxi0_O1a_MXDHV5B1g",
      databaseURL: "https://food-donation-bcce1.firebaseio.com",
      projectId: "food-donation-bcce1",
    };

    
    
const Firebase = firebase.initializeApp(config);
export default Firebase;