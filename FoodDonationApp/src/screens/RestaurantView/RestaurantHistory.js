import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import RestaurantFooterFooter from './../../components/RestaurantComponents/RestaurantFooter';
import MyHeader from './../../components/MyHeader';




export default class RestaurantHistory extends Component {




  render() {
    return (
      <View style={styles.container}>
      <MyHeader />
        <ScrollView>
          <Text>In RestaurantHistory</Text>
        </ScrollView>
        <View>
          <RestaurantFooterFooter navigation={this.props.navigation}/>
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