import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

import Maps from './src/components/maps/maps/Maps';
import LocationGeo from './src/components/maps/locationGeo/LocationGeo';

console.disableYellowBox = true;

type Props = {};
class App extends Component<Props> {
  constructor(){
    super()
    this.state = {allRestaurantDataArray: [lat= 10, lng=19]}
  };

  changeRestaurantData = (newData) => {
    this.setState({
      allRestaurantDataArray: newData
    });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Maps/>
        
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
