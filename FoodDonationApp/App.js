import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import firebase from 'firebase';


import Maps from './src/components/maps/maps/Maps';


console.disableYellowBox = true;

var config = {
  databaseURL: "https://food-donation-bcce1.firebaseio.com",
  projectId: "food-donation-bcce1",
};
firebase.initializeApp(config);

type Props = {};
class App extends Component<Props> {
 
writeUserData(email,fname,lname){
  firebase.database().ref('UsersList/').push({
      email,
      fname,
      lname
  }).then((data)=>{
      //success callback  
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
}

readUserData() {
  firebase.database().ref('items/').once('value', function (snapshot) {
      console.log(snapshot.val())
  });
}
  render() {
    return (
      <View style={styles.container}>
        <Maps/>
     <Button title={"write"} onPress={this.writeUserData("aexdfdsfsd@gmail.com", "Alefx", "Backlufnd")}> 
           </Button>
           
           </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "#5eb56a",
  },
  locateIcon: {
    bottom: 600,
    left: -170,
  },
  
});

export default App; 