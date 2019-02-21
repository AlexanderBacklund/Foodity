import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet } from 'react-native';
import RestaurantFooterFooter from './RestaurantFooter';
import MyHeader from './MyHeader';
import RestaurantAddMeal from './RestaurantAddMeal';



export default class RestaurantMyMeals extends Component {




  render() {
    return (
      <View style={styles.container}>
      <MyHeader />
        <ScrollView>
          <Button
          title = 'Add new food'
          onPress={() => {this.props.navigation.navigate('RestaurantAddMeal') }}
          >
          </Button>
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