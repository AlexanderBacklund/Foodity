import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Maps from './src/components/CharityComponents/Maps';
import Browse from './src/screens/CharityView/Browse';
import CharityProfile from './src/screens/CharityView/CharityProfile';
import Discover from './src/screens/CharityView/Discover';
import Orders from './src/screens/CharityView/Orders';
import Login from './src/screens/Login';
import SignUp from './src/components/SignUp';
import RestaurantAddMeal from './src/components/RestaurantComponents/RestaurantAddMeal' ;
import RestaurantHistory from './src/screens/RestaurantView/RestaurantHistory' ;
import RestaurantMyMeals from './src/screens/RestaurantView/RestaurantMyMeals' ;
import RestaurantProfile from './src/screens/RestaurantView/RestaurantProfile' ;
import RestaurantEditMeal from './src/components/RestaurantComponents/RestaurantEditMeal';
import Loading from './src/components/Loading' ;

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Maps,
    Browse,
    Discover,
    Orders,
    SignUp,
    Login,
    RestaurantAddMeal,
    RestaurantHistory,
    RestaurantMyMeals,
    RestaurantProfile,
    CharityProfile,
    RestaurantEditMeal,
    Loading
  },
  {
    initialRouteName: 'RestaurantProfile'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
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
