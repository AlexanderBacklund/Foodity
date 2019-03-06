import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView,ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase';
import Geocoder from 'react-native-geocoding';
import Loading from './Loading';
import Browse from './../screens/CharityView/Browse';

import Firebase from './../config/FirebaseConfig';


export default class Signup extends React.Component {

  state = { email: '', password: '', lname: '', fname: '', orgname: '', address: '', description: '', errorMessage: null, lat: '',
  lng: '' }
  
        
  writeUserData(email,fname,lname,orgname,typeOfUser,address,description, lat, lng, res){
    Firebase.database().ref('UsersList/'+res.user.uid).set({
        email,
        fname,
        lname,
        orgname,
        typeOfUser,
        address,
        description,
        lat,
        lng
        
        
    }).then((data)=>{
        //success callback

        this.props.navigation.navigate('Loading')
        var user = Firebase.auth().currentUser;
        // Comment out the following block of code to enable verification email.
        // user.sendEmailVerification().then(function() {
        //   // Email sent.
        // }).catch(function(error) {
        //   // An error happened.
        // });
        console.log('data ' , res)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }
  
    signUpHandler = () => {
      Firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => this.writeUserData(this.state.email,
          this.state.fname,
          this.state.lname,
          this.state.orgname,
          this.props.navigation.getParam('text'),
          this.state.address,
          this.state.description,
          this.state.lat,
          this.state.lng,
          res))
        .catch(error => this.setState({ errorMessage: error.message }))
      console.log('signUpHandler')
    }

    handleAddress = (text) => {
      this.setState({ address: text })
      this.getData(text);
    }

    getData(address) {
      Geocoder.from(address)
            .then(json => {
                var lat = json.results[0].geometry.location.lat;
                var lng = json.results[0].geometry.location.lng;
                this.setState({lat: lat, lng: lng});
            })
            .catch(error => console.warn(error));
          }


  render() {
    return (
        
        // <KeyboardAvoidingView style={styles.container}>
        <KeyboardAwareScrollView
      style={{ backgroundColor: '#5eb56a' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
    <View style={{height: '25%'}}></View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="First Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fname) => this.setState({fname})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(lname) => this.setState({lname})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Organisation Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(orgname) => this.setState({orgname})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Address"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={this.handleAddress}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Description"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(description) => this.setState({description})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        {console.log(this.props.navigation.getParam('text', 'nothing sent'))}
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUpHandler}>
          <Text style={styles.signUpText}>Register</Text>
        </TouchableHighlight>
        </KeyboardAwareScrollView>
      
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
      borderRadius:10,
      borderBottomWidth: 1,
      width:'80%',
      height:45,
      marginBottom:5,
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
    marginTop: 20,
    backgroundColor: "#c415bb",
  },
  signUpText: {
    color: 'white',
  }
});