import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';



class Location extends Component {
    constructor() {
        super();
        this.stateLocation ={
            focusLocation: {
              latitude: 59.334591,
              longitude: 18.053240,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
            locationChosen: false,
            markers: [
              {
                coordinate: {
                latitude: 59.334591,
                longitude: 18.053240,
                },
                title: "Blomkål",
                description: "Gul och smakrik.",
                image: images[0],
              },
              {
                coordinate: {
                latitude: 59.344591,
                longitude: 18.073240,
              },
              title: "Romsås",
              description: "God till Lax.",
              image: images[1],
            },{
              coordinate: {
                latitude: 59.324591,
                longitude: 18.083240,
              },
              title: "Spenatsoppa",
              description: "Värmande.",
              image: images[2],
            },
            {
              coordinate: {
                latitude: 59.354591,
                longitude: 18.063240,
              },
              title: "Årets julbord 2018",
              description: "Fortfarande smarrigt.",
              image: images[3],
            },
            ],
            region: {
              latitude: 45.52220671242907,
              longitude: -122.6653281029795,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
          }
    
    }
render () {
    return
}

}


  export default Location;