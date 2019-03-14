import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView,ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase';
import Geocoder from 'react-native-geocoding';
import Loading from './Loading';
import Browse from './../screens/CharityView/Browse';
import HideWithKeyboard from 'react-native-hide-with-keyboard';


import Firebase from './../config/FirebaseConfig';
// Fix for geocoder. Should go in config file.
Geocoder.init('AIzaSyBkp2QPE4lCbTotHM5VCk97vT4Sgpeu41Q');
export default class Signup extends React.Component {
  static navigationOptions = {
    header: null,
    };
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
      if(this.state.fname == '' || this.state.lname == '' || this.state.orgname == '' || this.state.address == '' || this.state.description == ''
      || this.state.email == '' || this.state.password == ''){
        this.setState({ errorMessage: "All fields are required to be filled out!" })
      }
      else if(this.state.lat == '' || this.state.lng == '') {
        this.setState({ errorMessage: "Please be more specific on the address" })
      } else {
      Firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          if(this.state.lat == '' || this.state.lng == '') {
            this.setState({ errorMessage: "Please be more specific on the address" })
          } else {
          this.writeUserData(this.state.email,
          this.state.fname,
          this.state.lname,
          this.state.orgname,
          this.props.navigation.getParam('text'),
          this.state.address,
          this.state.description,
          this.state.lat,
          this.state.lng,
          res)}
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
      console.log('signUpHandler')
    }

    handleAddress = (text) => {
      this.setState({ address: text })
      // console.log("inside handleAddress:",text);
      this.getData(text);
    }

    getData(address) {
      // console.log("inside geocoder:",address);
      // console.log("state:",this.state);
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
    
    <View style={styles.logocontainer}>
      <HideWithKeyboard>
        <Image style={styles.logo}
        source={require('./../../images/FoodityWhite.png')}>
        </Image>
        </HideWithKeyboard>
      </View>
      
    
    <View style={{height: '0%'}}></View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="First Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(fname) => this.setState({fname})}/>
        </View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(lname) => this.setState({lname})}/>
        </View>
        
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Organisation Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(orgname) => this.setState({orgname})}/>
        </View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Address"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={this.handleAddress}/>
        </View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Description"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(description) => this.setState({description})}/>
        </View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
        <Text style={{ color: 'red' }}>*</Text>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              placeholderTextColor='#585B5A'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        {console.log(this.props.navigation.getParam('text', 'nothing sent'))}
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
          <View style={styles.containerTwo}>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUpHandler}>
          <Text style={styles.signUpText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.signUpText}>Back</Text>
        </TouchableHighlight>
        </View>
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
    backgroundColor: '#6FDB88',
  },
  inputContainer: {
      borderBottomColor: '#585B5A', 
      backgroundColor: '#6FDB88',
      borderRadius:10,
      borderBottomWidth: 1,
      width:'80%',
      height:36,
      marginBottom:5,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:40,
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
    backgroundColor: '#5BB26F',
    width:'30%',
    height:40,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  
  signupButton: {
    marginTop: 20,
    backgroundColor: "#5BB26F",
  },
  signUpText: {
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
},
containerTwo: {
  // flex: 1,
  // flexDirection: 'row',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  marginTop:10,
  
  height: 45,
  // width:250,
  borderRadius:30,
  backgroundColor: '#6FDB88',
},
});