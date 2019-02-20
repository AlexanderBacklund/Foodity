import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import {Footer, Icon, Container} from 'native-base';



export default class RestaurantFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MyMealsColor : 'green',
      HistoryColor : 'green',
      ProfileColor : 'green',
      AccountColor : 'green',
    }
    this.onButtonPressDiscover =this.onButtonPressDiscover.bind(this);
  }
    onButtonPressDiscover = () => {
      this.setState({
        DiscoverColor : 'green',
      })
    }






  render() {
       return (
          <View style={styles.container.flex}>
            <Footer>

                <Button
                title="My meals"
                color = {this.state.MyMealsColor}
                onPress={() => { this.props.navigation.navigate('RestaurantMyMeals')} }

              />


                <Button
                title="History"
                color = {this.state.History}
                onPress={() => { this.props.navigation.navigate('RestaurantHistory')}}
              />



                <Button
                title="Profile"
                color = {this.state.Profile}
                onPress={() => {this.props.navigation.navigate('RestaurantProfile')}}
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