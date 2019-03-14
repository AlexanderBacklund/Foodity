import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import RestaurantFooterFooter from './../../components/RestaurantComponents/RestaurantFooter';
import MyHeader from './../../components/MyHeader';
import RestaurantAddMeal from './../../components/RestaurantComponents/RestaurantAddMeal';
import firebase from 'firebase';
import {List, ListItem, ListView, Card} from 'react-native-elements';


export default class RestaurantMyMeals extends Component {
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
               var data = {
                   data : childSnapshot.val(),
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
                <Button
                title="Edit"
                onPress={() => {this.props.navigation.navigate('RestaurantEditMeal', {food}) }}
                >
                </Button>



            </Card>

        );
      }.bind(this));
    }





  render() {



    return (
     <View style={styles.container}>
      <MyHeader />
      <Button
         title = 'Add meal'
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