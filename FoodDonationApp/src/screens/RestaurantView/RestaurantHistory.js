import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import MyHeader from './../../components/MyHeader';
import firebase from 'firebase';
import {List, ListItem, ListView, Card} from 'react-native-elements';



export default class RestaurantHistory extends Component {
    static navigationOptions = {
        header: null,
        };
    constructor(props) {
        super(props);
        this.state = {
            ListOfFood: [],
            refreshing: false,
        }
        this.myFood = this.myFood.bind(this);

}

    componentDidMount() {
         var myUid = firebase.auth().currentUser.uid;
         firebase.database().ref('History/').on('value', function(snapshot){
            var tempList = [];
            snapshot.forEach(function(childSnapshot){

               var validItem = (childSnapshot.val().food.data.Restaurant === myUid)
               var data = {
                   Portions : childSnapshot.val().Portions,
                   data : childSnapshot.val().food.data,
                   key :childSnapshot.key
               }
               {validItem ? (
                  tempList.push(data)
                  //this.state.ListOfFood.push(data)
               )
               :(
                null
               )}
            }.bind(this));

            this.setState({ListOfFood: tempList});
            this.forceUpdate();
         }.bind(this))


    }




    myFood() {
        return this.state.ListOfFood.map(function(food, i){
        return(

            <Card
                title={food.data.Name}
                >
                <Text>{food.data.Description}</Text>
                <Text>{"Portions donated:" + " " + food.Portions}</Text>
            </Card>

        );
      }.bind(this));
    }


  render() {
    return (
      <View style={styles.container}>
          <MyHeader />
          <ScrollView >
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