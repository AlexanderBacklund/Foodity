import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import { db } from '../Config';
export default class SignUp extends React.Component {
  state = { email: '', password: '', fname: '', lname: '', errorMessage: null }
  
  

// let addUser = item => {  
//   db.ref('/UsersList').push({
//     email: item.email
//   });
// };
writeUserData(email,fname,lname,res){
  firebase.database().ref('UsersList/'+res.user.uid).set({
      email,
      fname,
      lname
  }).then((data)=>{
      //success callback
      this.props.navigation.navigate('Home')
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: '#e5e53d', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.signUpHandler}>
          <Text style={styles.signUpText}>Register</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e8bce',
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