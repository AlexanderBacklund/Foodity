import React, {Component} from 'react';
import {TextInput, Alert, Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geocode from "react-geocode";
import firebase from 'firebase';

Geocoder.init('AIzaSyBkp2QPE4lCbTotHM5VCk97vT4Sgpeu41Q');

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
    address:"",
    address1:""
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

  // firebaseApp.database().ref('/users/' + userId).on('value', (snapshot) => {
  //   const userObj = snapshot.val();
  //   this.name = userObj.name;
  //   this.avatar = userObj.avatar;
  // });

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
  Geocoder.from("Jumkilsgatan 14A")
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
        })
        .catch(error => console.warn(error));
      }

      // getData() {

      //   Geocoder.from("Jumkilsgatan 14A")
      //   .then(json => {
      //     var addressComponent2 = json.results[0].address_components;
      //     console.log(addressComponent2);
      //   })
      //   .catch(error => console.warn(error));
      // }

  render() {
    

     firebase.database().ref('Restaurants/').once('value', function (snapshot) {
       console.log(snapshot.val())

    });
    


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
