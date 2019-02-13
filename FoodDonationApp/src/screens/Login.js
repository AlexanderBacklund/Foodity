import React from 'react';
import {StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null }

  loginHandler = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
    console.log('loginHandler')
  }


  render() {
    return (
        
        <KeyboardAvoidingView style={styles.container}>
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
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.loginHandler}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        {this.state.errorMessage &&
          <Text style={{ color: '#e5e53d', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
          {/* {console.log(this.state.errorMessage)} */}
        
        <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>Not a member? Sign up now.</Text>
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
    backgroundColor: '#4076ce',
  },
  inputContainer: {
      borderBottomColor: '#4076ce',
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
  registerButton: {
    backgroundColor: 'rgba(13, 65, 168,0.4)',
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});