import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, AppState} from 'react-native';
import {Footer, Icon, Container} from 'native-base';
import {Header} from 'react-native-elements';
//import * as c from '../Styles/ColorScheme.js'


export default class MyFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DiscoverColor : 'green',
      BrowseColor : 'green',
      OrdersColor : 'green',
      AccountColor : 'green',
    }
    this.onButtonPressDiscover =this.onButtonPressDiscover.bind(this);
  }
    onButtonPressDiscover = () => {
      this.setState({
        DiscoverColor : 'blue',
      })
    }

  


  render() {
       return (
          <View style={styles.container}>
            <Footer>

                <Button
                title="Discover"
                color = {this.state.DiscoverColor}
                onPress={() => { this.props.navigation.navigate('Maps')} }

              />


                <Button
                title="Browse"
                color = {this.state.BrowseColor}
                onPress={() => { this.props.navigation.navigate('Browse')}}
              />



                <Button
                title="Orders"
                color = {this.state.OrdersColor}
                onPress={() => { this.props.navigation.navigate('Orders')}}
              />

                <Button
                title="Account"
                color = {this.state.AccountColor}
                onPress={() => { this.props.navigation.navigate('CharityProfile')}}
              />
            </Footer>
          </View>
        );
    }
}



const styles = StyleSheet.create({
  container:{
    //flex:1,
    width: 300,
    justifyContent: 'center',
  }
});
