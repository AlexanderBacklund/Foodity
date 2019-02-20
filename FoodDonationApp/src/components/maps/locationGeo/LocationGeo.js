import React, {Component} from 'react';
import {TextInput, Alert, Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Geocoder from 'react-native-geocoding';
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
    allResturantDataArray: [],
    lng:"",
    lat:""
  }
  
}

writeToRestaurant() {
  var name = this.state.name;
  var desc = this.state.desc;
  var address = this.state.address;
  
  var lat = this.state.lat;
  var lng = this.state.lng;
  firebase.database().ref('Restaurants/').push({
      name,
      desc,
      address,
      lat,
      lng

    }).then((data) =>{
      console.log('Successfully added new restaurant')
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

  // readRestaurantData() {
  //   firebase.database().ref('Restaurants/').once('value', function (snapshot) {
  //     console.log(snapshot.val())
  //   });
  // }

  handleName = (text) => {
      this.setState({ name: text })
  }

  handleDesc = (text) => {
    this.setState({ desc: text })
  }

  handleAddress = (text) => {
    this.setState({ address: text })
    this.getData(text);
  }

  getData(address) {
  Geocoder.from(address)
        .then(json => {
            var lat = json.results[0].geometry.location.lat;
            var lng = json.results[0].geometry.location.lng;
            this.setState({lat: lat, lng: lng});
        })
        .catch(error => console.warn(error));
      }

    componentDidMount() {
      let allResturant = [];
      firebase.database().ref('Restaurants/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            childData = childSnapshot.val();
            allResturant.push(childData);
          });
          this.setState ( {
            allResturantDataArray: allResturant
        })
          
        }.bind(this));
        
        

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
        <Button title={"Show all restaurants in console"} onPress={() => {console.log(this.state.allResturantDataArray)}}></Button>
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
