import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet } from 'react-native';
import RestaurantFooterFooter from './RestaurantFooter';
import MyHeader from './MyHeader';
import RestaurantAddMeal from './RestaurantAddMeal';
import firebase from 'firebase';
import {List, ListItem, ListView} from 'react-native-elements';


export default class RestaurantMyMeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOfFood: [],
        }
        this.myFood = this.myFood.bind(this);


}


    componentWillMount() {
         console.log("in cwm")
         var myUid = firebase.auth().currentUser.uid;
         firebase.database().ref('FoodList/').once('value').then( function(snapshot){
            console.log("in snapshot")
            snapshot.forEach(function(childSnapshot){
               console.log("in childSnapshot")

               var validItem = (childSnapshot.val().Restaurant === myUid)
               var data = childSnapshot.val()
               {validItem ? (
                  this.state.ListOfFood.push(data)
               )
               :(
                null
               )}
               this.forceUpdate();
            }.bind(this));

         }.bind(this))


    }




    myFood() {
        return this.state.ListOfFood.map(function(food, i){
        return(
          <View key={i}>
            <Text>{food.Name}</Text>
            <Text>"HEJ"</Text>
            <View>
              <Text>{food.Weight}</Text>
            </View>
          </View>
        );
      });
    }





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
         {this.myFood()}
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