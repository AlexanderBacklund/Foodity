import React, { Component } from 'react';  
import {ScrollView, View, Text, StyleSheet } from 'react-native';  
import MyFooter from './MyFooter';
import MyHeader from './MyHeader';
 
 
 
 
export default class Account extends Component {  
 
 
  render() {
    return (
      <View style={styles.container}>
      <MyHeader/>
        <ScrollView>
          <Text>in Account</Text>
        </ScrollView>
        <View>
          <MyFooter navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});