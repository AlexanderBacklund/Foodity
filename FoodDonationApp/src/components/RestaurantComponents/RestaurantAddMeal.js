import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import Login from './../../screens/Login';
import RestaurantMyMeals from './../../screens/RestaurantView/RestaurantMyMeals';
// const firebaseConfig = {
//   apiKey: "AIzaSyCDNg-6wLAG9uO695FAyMlvWlnjWEBsY50",
//   authDomain: "food-donation-bcce1.firebaseapp.com",
//   databaseURL: "https://food-donation-bcce1.firebaseio.com",
//   projectId: "food-donation-bcce1",
//   storageBucket: "food-donation-bcce1.appspot.com",
//   messagingSenderId: "474995894111",
// };

// const app = firebase.initializeApp(firebaseConfig);

export default class RestaurantAddMeals extends React.Component {




constructor(props) {
    super(props);
    this.state = {
        Name: '',
        Description: '',
        Weight: 0,
        Picture: 'https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/meals%2Fimages.png?alt=media&token=b27ac614-9f7a-4260-ac17-3e7c73af47bb',
        Portions: 0,
        Taken: false,
        Restaurant: '',
        errorMessage: null
    }
    this.writeFoodData = this.writeFoodData.bind(this);
}

    componentDidMount() {

          var myUid = firebase.auth().currentUser.uid;
          this.setState({
            Restaurant : myUid
          });
          //firebase.database().ref('UsersList/' + myUid).once('value').then(function(snapshot){
           //     this.props.navigation.navigate((snapshot.val().lname === 'Progress') ? 'Discover' : 'RestaurantMyMeals')
          }



  writeFoodData(Name, Description, Weight, Picture, Portions, Taken, Restaurant) {
    firebase.database().ref('FoodList/').push({
        Name,
        Description,
        Weight,
        Picture,
        Portions,
        Taken,
        Restaurant

    }).then((data)=>{
        this.props.navigation.navigate('RestaurantMyMeals')

    }).catch((error)=>{
        console.log('error' , error)
    })
   }



  render() {
    return (

        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Name of food"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Name) => this.setState({Name})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Amount of portions"
              keyboardType="number-pad"
              underlineColorAndroid='transparent'
              onChangeText={(Portions) => this.setState({Portions})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Description"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Description) => this.setState({Description})}/>
        </View>


        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Weight per portion"
              keyboardType="number-pad"
              underlineColorAndroid='transparent'
              onChangeText={(Weight) => this.setState({Weight})}/>
        </View>
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() =>this.writeFoodData(this.state.Name,this.state.Description,this.state.Weight,this.state.Picture,this.state.Portions, this.state.Taken, this.state.Restaurant)}>
          <Text style={styles.signUpText}>Add food</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5eb56a',
  },
  inputContainer: {
      borderBottomColor: '#0e8bce',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#c415bb",
  },
  signUpText: {
    color: 'white',
  }
});