import React, { Component } from 'react';
import {Button, ScrollView, View, Text, StyleSheet, RefreshControl, TouchableOpacity, Image } from 'react-native';
import RestaurantFooterFooter from './../../components/RestaurantComponents/RestaurantFooter';
import MyHeader from './../../components/MyHeader';
import RestaurantAddMeal from './../../components/RestaurantComponents/RestaurantAddMeal';
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
            if(food.data.Picture == ""){
                food.data.Picture = "https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/meals%2Fimages.png?alt=media&token=b27ac614-9f7a-4260-ac17-3e7c73af47bb";
            }
            return(
            
            <Card
                title={food.data.Name}
                >
                <TouchableOpacity  style={styles.avatarContainer}>
                  
                  <Image
                  style={styles.avatar}
                  resizeMode="stretch"
                         source={{uri: food.data.Picture}}/>
                 </TouchableOpacity>
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
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e2e2e2",
    marginBottom:10,
    alignSelf: 'center',
    overflow: 'hidden',
    // resizeMode: 'contain',
  },
  avatar: {
    width: 150,
    height: 150,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#5BB26F",
    // marginBottom:10,
    // alignSelf: 'center',
    // overflow: 'hidden',
    // resizeMode: 'contain',
  }
});