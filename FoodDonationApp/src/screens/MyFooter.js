import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import {Footer, Icon, Container} from 'native-base';
import {Header} from 'react-native-elements';
 
 
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
          <View style={styles.container.flex}>
            <Footer>
 
                <Button
                title="Discover"
                color = {this.state.DiscoverColor}
                onPress={() => {this.setState({DiscoverColor : 'black'}), this.props.navigation.navigate('Discover')} }
 
              />
             
 
                <Button
                title="Browse"
                color = {this.state.BrowseColor}
                onPress={() => {this.setState({BrowseColor : 'black'}), this.props.navigation.navigate('Browse')}}
              />
 
 
 
                <Button
                title="Orders"
                color = {this.state.OrdersColor}
                onPress={() => {this.setState({OrdersColor : 'black'}), this.props.navigation.navigate('Orders')}}
              />
 
                <Button
                title="Account"
                color = {this.state.AccountColor}
                onPress={() => {this.setState({AccountColor : 'black'}), this.props.navigation.navigate('Account')}}
              />
            </Footer>
          </View>
        );
    }
}
 
 
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  }
});