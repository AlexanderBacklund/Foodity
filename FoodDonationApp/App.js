import React, { Component } from 'react';  
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';

// we will use these two screens later in our AppNavigator
import AddItem from './src/screens/AddItem';  
import List from './src/screens/List';

const AppNavigator = createStackNavigator(  
  {
    Home,
    Login,
    AddItem,
    List,
    SignUp,
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {  
  render() {
    return <AppContainer />;
  }
}
