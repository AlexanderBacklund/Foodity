import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import Discover from './Discover'
import RestaurantMyMeals from './RestaurantMyMeals'




export default class Loading extends React.Component {


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          var myUid = firebase.auth().currentUser.uid;
          firebase.database().ref('UsersList/' + myUid).once('value').then(function(snapshot){
                this.props.navigation.navigate((snapshot.val().typeOfUser === 'Charity') ? 'Maps' : 'RestaurantMyMeals')
              }.bind(this));
          })
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
