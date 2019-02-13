import React, {Component} from 'react';
import {TextInput, Alert, Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geocode from "react-geocode";
import firebase from 'firebase';

var config = {
  databaseURL: "https://food-donation-bcce1.firebaseio.com",
  projectId: "food-donation-bcce1",
};
firebase.initializeApp(config);

class LocationGeo extends Component {
constructor() {
  super();
  this.state={
    name:"",
    desc:"",
    address:""
  }
}

writeToRestaurant() {
  var name = this.state.name;
  var desc = this.state.desc;
  var address = this.state.address;
  firebase.database().ref('Restaurants/').push({
      name,
      desc,
      address
    }).then((data) =>{
      console.log('successfully added new restaurant')
    }).catch((error) =>{
      console.log('error', error)
    })
}

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

  readRestaurantData() {
    firebase.database().ref('Restaurants/').once('value', function (snapshot) {
      console.log(snapshot.val())
    });
  }

  handleName = (text) => {
      this.setState({ name: text })
  }

  handleDesc = (text) => {
    this.setState({ desc: text })
  }

  handleAddress = (text) => {
    this.setState({ address: text })
  }

  getData() {
    Geocoder.init("AIzaSyBNiGg5coYRTxHRZyPR8V1-EC28MpDtpqg"); // use a valid API key
    Geocoder.from(41.89, 12.49)
      .then(json => {
      	var addressComponent = json.results[0].address_components[0];
    		Alert.alert(addressComponent.long_name);
    	})
    	.catch(error => console.warn(error));

    Geocoder.from("marmorvägen Uppsala")
    .then(json => {
    	var addressComponent2 = json.results[0].address_components[0];
      console.log(addressComponent2);
    })
    .catch(error => console.warn(error));
  }

  render() {

    return(
      <View style = {styles.container}>

        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Name"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {this.handleName}/>

        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Desc"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {this.handleDesc}/>

        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Address"
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          onChangeText = {this.handleAddress}/>

        <Button title={"Add a restaurant"} onPress={() => this.writeToRestaurant()}></Button>
        <Button title={"Click me"} onPress={() => {this.getData()}}></Button>
        </View>

    );
  }
}
export default LocationGeo;

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})
