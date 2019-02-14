import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Maps from './src/components/maps/maps/Maps';
import LocationGeo from './src/components/maps/locationGeo/LocationGeo';
import Home from './src/screens/Home';
import Browse from './src/screens/Browse';
import Account from './src/screens/Account';
import Discover from './src/screens/Discover';
import Orders from './src/screens/Orders';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Home,
    Maps,
    LocationGeo,
    Browse,
    Account,
    Discover,
    Orders
  },
  {
    initialRouteName: 'Discover'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
