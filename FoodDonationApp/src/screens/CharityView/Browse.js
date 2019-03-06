import React, { Component } from 'react';  
import {ScrollView, View, Text, StyleSheet } from 'react-native';
import {List, ListItem, ListView, Card} from 'react-native-elements';
import MyFooter from './../../components/CharityComponents/MyFooter';
import MyHeader from './../../components/MyHeader';
import firebase from 'firebase';



export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOfFood: [],
        }
        this.myFood = this.myFood.bind(this);


}



    componentDidMount() {
         firebase.database().ref('FoodList/').on('value', function(snapshot){
            var tempList = [];
            snapshot.forEach(function(childSnapshot){
               var data = childSnapshot.val()
               tempList.push(data)

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
        <ScrollView>

         {this.myFood()}
        </ScrollView>

        <View>
         <MyFooter navigation={this.props.navigation} />
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