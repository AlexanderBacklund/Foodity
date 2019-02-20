import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import RestaurantFooterFooter from './RestaurantFooter';
import MyHeader from './MyHeader';




export default class RestaurantMyMeals extends Component {




  render() {
    return (
      <View style={styles.container}>
      <MyHeader />
        <ScrollView>
          <Text>In RestaurantMyMeals</Text>
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