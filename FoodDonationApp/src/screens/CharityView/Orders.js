import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Firebase from './../../config/FirebaseConfig';
import {List, ListItem, ListView, Card, Button} from 'react-native-elements';


export default class Orders extends Component {
    static navigationOptions = {
        header: null,
        };
    constructor() {
        super();
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
         var myUid = Firebase.auth().currentUser.uid;
         Firebase.database().ref('BookedFood/').on('value', function(snapshot){
            var tempList = [];
            snapshot.forEach(function(childSnapshot){
               var data = childSnapshot.val()
               if (data.Charity === myUid) {
                   food = {
                       key : childSnapshot.key,
                       data : data
                   }
                   tempList.push(food)
               }
            }.bind(this));

            this.setState({ListOfFood: tempList});
            this.forceUpdate();
         }.bind(this))
    }

    async _handleCancelOrder(food) {
        Firebase.database().ref('FoodList/' + food['data'].FromWhatOrder).update({Portions: await this.newAmountOfFood(food)});
        Firebase.database().ref('BookedFood/').child('' + food.key).remove()
    }

    newAmountOfFood(food): Promise<number> {
        return (
            Firebase.database().ref('FoodList/' + food['data'].FromWhatOrder).once('value').then(snapshot => snapshot.val().Portions + food['data'].Portions)
        )
    }

    currentAmountOfFood(food): Promise<number> {
        return (
            Firebase.database().ref('FoodList/' + food['data'].FromWhatOrder).once('value').then(snapshot => snapshot.val().Portions)
        )
    }

    async _handleCompleteOrder(food) {
        Firebase.database().ref('History/').push({
            user: Firebase.auth().currentUser.uid,
            food: food,
            Portions: food['data'].Portions
        })
        let currentAmountOfFood = await this.currentAmountOfFood(food)
        console.log(currentAmountOfFood)
        if(currentAmountOfFood <= 0) {
            console.log(food)
            Firebase.database().ref('FoodList/').child('' + food['data'].FromWhatOrder).remove()
        }
        Firebase.database().ref('BookedFood/').child('' + food.key).remove()
    }

    myFood = () => {
        if (this.state.ListOfFood.length != 0) {
            return this.state.ListOfFood.map((food, i) => {
                return(
                    <Card title={food['data'].Name}>
                        <Text style={styles.Text}>Descriptions: {food['data'].Description}</Text>
                        <Text style={styles.Text}>Portions: {food['data'].Portions}</Text>
                        <Button style={styles.ButtonR} raised="True" title="Cancel" type="outline" onPress={() => this._handleCancelOrder(food)}/>
                        <Button style={styles.ButtonG} raised="True" title="Complete" type="outline" onPress={() => this._handleCompleteOrder(food)}/>
                    </Card>
                )
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
                    _onRefresh={this._onRefresh}/>
                }>

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
    },
    ButtonG: {
        flex:2,
        color: "rgb(22, 195, 60)"
    },
    ButtonR: {
        flex: 2,
        color: "rgb(201, 18, 18)"
    }
});
