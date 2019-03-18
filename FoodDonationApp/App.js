import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom, createSwitchNavigator, createMaterialBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Maps from './src/components/CharityComponents/Maps';
import Browse from './src/screens/CharityView/Browse';
import CharityProfile from './src/screens/CharityView/CharityProfile';
import Orders from './src/screens/CharityView/Orders';
import Login from './src/screens/Login';
import SignUp from './src/components/SignUp';
import RestaurantAddMeal from './src/components/RestaurantComponents/RestaurantAddMeal' ;
import RestaurantHistory from './src/screens/RestaurantView/RestaurantHistory' ;
import RestaurantMyMeals from './src/screens/RestaurantView/RestaurantMyMeals' ;
import RestaurantProfile from './src/screens/RestaurantView/RestaurantProfile' ;
import RestaurantEditMeal from './src/components/RestaurantComponents/RestaurantEditMeal';
import Loading from './src/components/Loading' ;
import Splash from './src/screens/Splash' ;

console.disableYellowBox = true;

const CharityTabNavigator = createBottomTabNavigator({
  Maps: {screen: Maps,
      navigationOptions: {
        tabBarLabel: 'Discover',
        tabBarIcon:({focused, tintColor}) => <Icon name={'globe'} size={25} color={tintColor} />
        }
      },
  Browse: {screen: Browse,
      navigationOptions: {
        tabBarLabel: 'Browse',
        tabBarIcon:({focused, tintColor}) => <Icon name={'bars'} size={25} color={tintColor} />
        }
      },
  Orders: {screen: Orders,
      navigationOptions: {
        tabBarLabel: 'Orders',
        tabBarIcon:({focused, tintColor}) => <Icon name={'cutlery'} size={25} color={tintColor} />
        }
      },
  Profile: {screen: CharityProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon:({focused, tintColor}) => <Icon name={'user'} size={25} color={tintColor} />
        }
      }
  },
  {

    initialRouteName: 'Browse',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#448E55',
      inactiveTintColor: '#848987',
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: 'white',
    },
  });

const MyMealsStack = createStackNavigator({
  RestaurantAddMeal: RestaurantAddMeal,
  RestaurantEditMeal: RestaurantEditMeal,
  RestaurantMyMeals: RestaurantMyMeals
  },
  {
    initialRouteName: 'RestaurantMyMeals'
  });

const RestaurantTabNavigator = createBottomTabNavigator({
  RestaurantMyMeals: {screen: MyMealsStack,
      navigationOptions: {
        tabBarLabel: 'My Meals',
        tabBarIcon:({focused, tintColor}) => <Icon name={'cutlery'} size={25} color={tintColor} />
        }
      },
  RestaurantHistory: {screen: RestaurantHistory,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon:({focused, tintColor}) => <Icon name={'history'} size={25} color={tintColor} />
        }
      },
  RestaurantProfile: {screen: RestaurantProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon:({focused, tintColor}) => <Icon name={'user'} size={25} color={tintColor} />
        }
      }
  },
  {
    initialRouteName: 'RestaurantMyMeals',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#448E55',
      inactiveTintColor: '#848987',
      activeBackgroundColor: 'white',
      inactiveBackgroundColor: 'white',
    },
  });

const AuthStack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Loading: Loading,
  Splash: Splash
  },
  {
    initialRouteName: 'Splash'
  });


const AppContainer = createAppContainer(createSwitchNavigator({
  Restaurant: RestaurantTabNavigator,
  Charity: CharityTabNavigator,
  auth: AuthStack
  },
  {
    initialRouteName: 'auth'
  }));

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
