import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';

import Firebase from './../config/FirebaseConfig';

import SignUp from './../components/SignUp';
import Loading from './../components/Loading';
import Browse from './CharityView/Browse';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
    };
  state = { email: '', password: '', errorMessage: null }
  loginHandler = () => {
    const { email, password } = this.state
    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() =>{ var user = Firebase.auth().currentUser; 
        // If email verification is commented out in SignUp.js, then if condition should be (user.emailVerified==true) else it should be (user.emailVerified==false). Just for testing.
        if (user.emailVerified==true) {
          this.setState({ errorMessage: "Email not verified. Please click in the verification link sent to your email address." })
        } else {
          this.props.navigation.navigate('Loading')
        }
        var db = Firebase.database().ref('UsersList/'+user.uid);
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
        <View style={styles.logocontainer}>
        <Image style={styles.logo}
        source={require('./../../images/FoodityWhite.png')}>
        </Image>
      </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              // leftIcon={{ type:'antdesign', name: 'mail' ,color: 'grey'}}
              // leftIconContainerStyle={{marginLeft:0, marginBottom: 3, marginRight: 5}}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
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
              placeholderTextColor='#585B5A'
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
            <Text style={styles.loginText}>Restaurant</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.registerButton]} onPress={() => this.props.navigation.navigate('SignUp', {text: 'Charity' })}>
            <Text style={styles.loginText}>Charity</Text>
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
    backgroundColor: '#6FDB88',
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
    backgroundColor: '#6FDB88',
    
  },
  inputContainer: {
      borderBottomColor: '#585B5A',
      backgroundColor: '#6FDB88',
      borderRadius:10,
      borderBottomWidth: 1,
      width:250,
      height:40,
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
    height:40,
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
    backgroundColor: '#5BB26F',
    width:'30%',
    height:40,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  loginButton: {
    backgroundColor: "#5BB26F",
    borderRadius:10
  },
  loginText: {
    color: 'white',
  },
  logocontainer: {
    backgroundColor: '#6FDB88',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
logo: {
    width: 128,
    height: 70,
    marginBottom: 3,
}
});