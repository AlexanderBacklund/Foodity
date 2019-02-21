import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import Loading from './Loading';
import Login from './Login';
import RestaurantMyMeals from './RestaurantMyMeals';
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
        Decription: '',
        Weight: 0,
        Picture: '',
        Portions: 0,
        Taken: false,
        errorMessage: null
    }
    this.writeFoodData = this.writeFoodData.bind(this);
}


  writeFoodData(Name, Decription, Weight, Picture, Portions, Taken) {
    firebase.database().ref('FoodList/').push({
        Name,
        Decription,
        Weight,
        Picture,
        Portions,
        Taken

    }).then((data)=>{
        this.props.navigation.navigate('RestaurantMyMeals')
    }).catch((error)=>{
        console.log('error' , error)
    })
   }

    addFoodHandler = () => {

      this.writeFoodData(this.state.Name,this.state.Decription,This.state.Weight,this.state.Picture,this.state.Portions, this.state.Taken)

    }


  writeUserData(email,fname,lname,res){
    firebase.database().ref('UsersList/'+res.user.uid).set({
        email,
        fname,
        lname
    }).then((data)=>{
        //success callback
        this.props.navigation.navigate('Loading')
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

    signUpHandler = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => this.writeUserData(this.state.email,this.state.fname,this.state.lname,res))
        .catch(error => this.setState({ errorMessage: error.message }))
      console.log('signUpHandler')
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
              onChangeText={(Amount) => this.setState({Amount})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Decription"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Decription) => this.setState({Decription})}/>
        </View>


        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Weight"
              keyboardType="number-pad"
              underlineColorAndroid='transparent'
              onChangeText={(Weight) => this.setState({Weight})}/>
        </View>
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() =>this.writeFoodData(this.state.Name,this.state.Decription,this.state.Weight,this.state.Picture,this.state.Portions, this.state.Taken)}>
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