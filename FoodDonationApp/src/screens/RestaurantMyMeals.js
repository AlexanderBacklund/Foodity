import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import MyHeader from './MyHeader';
import RestaurantAddMeal from './RestaurantAddMeal';
import firebase from 'firebase';
import {List, ListItem, ListView, Card} from 'react-native-elements';


export default class RestaurantMyMeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOfFood: [],
            refreshing: false,
        }
        this.myFood = this.myFood.bind(this);


}

    _onRefresh = () => {
    this.setState({refreshing:true});
        fetchData().then(()=>{
            this.setState({refreshing:false})
        });
    }


    componentDidMount() {
         var myUid = firebase.auth().currentUser.uid;
         firebase.database().ref('FoodList/').on('value', function(snapshot){
            var tempList = [];
            snapshot.forEach(function(childSnapshot){

               var validItem = (childSnapshot.val().Restaurant === myUid)
               var data = childSnapshot.val()
               {validItem ? (
                  tempList.push(data)
                  //this.state.ListOfFood.push(data)
               )
               :(
                null
               )}
            }.bind(this));

            this.setState({ListOfFood: tempList});
            console.log(this.state.ListOfFood);
            this.forceUpdate();
         }.bind(this))


    }




    myFood() {
        return this.state.ListOfFood.map(function(food, i){
        return(

            <Card
                title={food.Name}
                >
                <Text>{food.Description}</Text>
                <Button
                title="Edit"
                >
                </Button>



            </Card>
          /*<View key={i}>
            <Text>{food.Name}</Text>
            <View>
              <Text>{food.Weight}</Text>
            </View>
          </View>*/
        );
      });
    }





  render() {



    return (
     <View style={styles.container}>
      <MyHeader />
      <Button
         title = 'Add new food'
         onPress={() => {this.props.navigation.navigate('RestaurantAddMeal') }}
         >
      </Button>
        <ScrollView
            RefreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    _onRefresh={this._onRefresh}
                />
            }
            >

         {this.myFood()}
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