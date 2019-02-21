import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import SignUp from './SignUp';
import Loading from './Loading';
import Browse from './Browse';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';


export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null }
  loginHandler = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() =>{ var user = firebase.auth().currentUser; 
        // If email verification is commented out in SignUp.js, then if condition should be (user.emailVerified==true) else it should be (user.emailVerified==false). Just for testing.
        if (user.emailVerified==false) {
          this.setState({ errorMessage: "Email not verified. Please click in the verification link sent to your email address." })
        } else {
          this.props.navigation.navigate('Browse')
        }
        var db = firebase.database().ref('UsersList/'+user.uid);
        db.once('value').then( function (snap) {
          console.log((snap.val().typeOfUser)=="Restaurant"); // Check type of user
          console.log(user.emailVerified); 
         });
        // console.log(db.email);
      //   this.props.navigation.navigate('LocationGeo')
      // this.props.navigation.navigate('Browse')
      }).catch(error => this.setState({ errorMessage: error.message }))
    console.log('loginHandler')
  }


  render() {
    return (
        
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              // leftIcon={{ type:'antdesign', name: 'mail' ,color: 'grey'}}
              // leftIconContainerStyle={{marginLeft:0, marginBottom: 3, marginRight: 5}}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              // leftIcon={{ type:'antdesign', name: 'lock' ,color: 'grey'}}
              // leftIconContainerStyle={{marginLeft:0, marginBottom: 3, marginRight: 5}}
              // rightIcon={{type:'antdesign', name: 'eye' ,color: 'grey'}}
              // rightIconContainerStyle={{marginLeft:0, marginBottom: 3, marginRight: 5}}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.loginHandler}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
          {/* {console.log(this.state.errorMessage)} */}

          <View>
          <Text style={{ color: 'black', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>Not Registered? Don't worry. You can Sign Up below.</Text>
        </View>

          <View style={styles.containerTwo}>
        <TouchableHighlight style={[styles.registerButton]} onPress={() => this.props.navigation.navigate('SignUp', {text: 'Restaurant' })}>
            <Text>Restaurant</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.registerButton]} onPress={() => this.props.navigation.navigate('SignUp', {text: 'Charity' })}>
            <Text>Charity</Text>
        </TouchableHighlight>
        </View>
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
  containerTwo: {
    // flex: 1,
    // flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    height: 45,
    // width:250,
    borderRadius:30,
    backgroundColor: '#5eb56a',
    
  },
  inputContainer: {
      borderBottomColor: '#4076ce',
      backgroundColor: '#FFFFFF',
      borderRadius:10,
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
    // marginLeft:15,
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
  registerButton: {
    backgroundColor: 'rgba(13, 65, 168,0.4)',
    width:'30%',
    height:40,
    borderRadius:30,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});