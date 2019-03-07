import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import MyFooter from './../../components/CharityComponents/MyFooter.js'
import firebase from 'firebase';
import {List, ListItem, ListView, Card} from 'react-native-elements';


export default class Orders extends Component {
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
         firebase.database().ref('BookedFood/').on('value', function(snapshot){
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
        if (this.state.ListOfFood.length != 0) {
            return this.state.ListOfFood.map(function(food, i){
            return(
                <Card title={food.Name}>
                    <Text style={styles.Text}>Descriptions: {food.Description}</Text>
                    <Text style={styles.Text}>Portions: {food.Portions}</Text>
                </Card>
                );
            });
        } else {
            return(
                <Text style={styles.TextNoFood}> You have no booked food please go in to Discover page to book food</Text>
            )
        }
    }





  render() {



    return (
     <View style={styles.container}>
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
},
    Text: {
        fontSize: 14,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
    TextNoFood: {
        textAlignVertical: "center",
        fontSize: 20,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    }
});