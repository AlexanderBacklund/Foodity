import React, { Component } from 'react';
import {ScrollView, Button, View, Text, StyleSheet } from 'react-native';
import {Icon, Container} from 'native-base'

import Maps from './../components/maps/maps/Maps';
import MyHeader from './MyHeader'

export default class Home extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <MyHeader />
      <View style={{flex: 1 } }>
      <ScrollView>
        <Button
          title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
        />
        <Button
          title="List of Items"
          color="green"
          onPress={() => {this.props.navigation.navigate('List')}}
        />
        </ScrollView>
        <Maps/>
        </View>
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
