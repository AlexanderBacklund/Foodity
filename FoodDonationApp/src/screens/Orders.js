import React, { Component } from 'react';  
import {ScrollView, View, Text, StyleSheet } from 'react-native';  
import MyHeader from './MyHeader'
 
 
 
export default class Orders extends Component {  
 
 
  render() {
    return (
      <View style={styles.container}>
      <MyHeader/>
        <ScrollView>
          <Text>In order</Text>
        </ScrollView>
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