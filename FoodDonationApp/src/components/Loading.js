import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import RestaurantMyMeals from './../screens/RestaurantView/RestaurantMyMeals'

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null,
    };
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
        <Text style={styles.loadingText}>Loading</Text>
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
    backgroundColor: '#6FDB88',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500'
  }

})
