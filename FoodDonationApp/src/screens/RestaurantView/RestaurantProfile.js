import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import RestaurantFooterFooter from './../../components/RestaurantComponents/RestaurantFooter';
import MyHeader from './../../components/MyHeader';
import firebase from './../../config/FirebaseConfig';
import Geocoder from 'react-native-geocoding';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Sae} from 'react-native-textinput-effects';
export default class RestaurantProfile extends Component {
  

  state = {currentData: {email: '', lname: '', fname: '', orgname: '', address: '', description: '',lat: '', lng: ''}, items: []};

  componentDidMount() {
    var user = firebase.auth().currentUser.uid;
    let itemsRef = firebase.database().ref('UsersList/'+user);
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = data;
      this.setState({ items });
      this.state.currentData = this.state.items
    })
  }
  writeUserData = () => {
        
  console.log(this.state.items);
  console.log(this.state.currentData);
    var user = firebase.auth().currentUser;
    firebase.database().ref('UsersList/'+user.uid).update(this.state.currentData)
      .then((data)=>{
      this.state.items = this.state.items
      // this.setState({currentData: this.state.currentData})
      this.setState({...this.state, items: this.state.items})
      this.setState({...this.state, currentData: this.state.items})
      this.state.currentData = this.state.items
      console.log('data ' , this.state)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }
  handleAddress = (text) => {
    this.setState({currentData: {...this.state.currentData, address: text}})
    this.getData(text);
  }

  getData(address) {
    Geocoder.from(address)
          .then(json => {
              var lat = json.results[0].geometry.location.lat;
              var lng = json.results[0].geometry.location.lng;
              this.setState({currentData: {...this.state.currentData, lat: lat}});
              this.setState({currentData: {...this.state.currentData, lng: lng}});
              
          })
          .catch(error => console.warn(error));
        }
  render() {
    return (
      <View style={styles.container}>
        <MyHeader />
          <ScrollView>
            {/* <Text>In RestaurantProfile</Text> */}
            <View style={[styles.card2, { backgroundColor: 'white' }]}>
           <Text style={styles.title}>Profile</Text>
           <Sae
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'First Name'}
             placeholder=""
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.fname}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={(fname) => this.setState({currentData: {...this.state.currentData, fname: fname}} )}
           />
           <Sae
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'Last Name'}
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.lname}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={(lname) => this.setState({currentData: { ...this.state.currentData, lname: lname} } )}
           />
           <Sae
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'Organization Name'}
             placeholder=""
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.orgname}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={(orgname) => this.setState({currentData: {...this.state.currentData, orgname: orgname}})}
           />
           <Sae
             
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'Address'}
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.address}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={this.handleAddress}
           />
           <Sae
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'Description'}
             placeholder=""
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.description}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={(description) => this.setState({currentData: {...this.state.currentData, description: description}})}
           />
           <Sae
             style={styles.input}
             inputStyle={{color:'slategrey',}}
             label={'Email'}
             iconClass={FontAwesomeIcon}
             iconName={'pencil'}
             iconColor={'slategrey'}
             labelStyle={{color:'slategrey',}}
            //  placeholder={this.state.items.email}
             keyboardType="email-address"
             underlineColorAndroid='transparent'
             onChangeText={(email) => this.setState({currentData: {...this.state.currentData, email: email}})}
           />
           <TouchableHighlight style={[styles.buttonContainer, styles.saveButton]} onPress={this.writeUserData}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableHighlight>
         </View>
           
          </ScrollView>
          <View>
            <RestaurantFooterFooter navigation={this.props.navigation}/>
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     paddingTop: 24,
  //     backgroundColor: 'white',
  //   },
    content: {
      // not cool but good enough to make all inputs visible when keyboard is active
      paddingBottom: 300,
    },
    card1: {
      paddingVertical: 16,
    },
    card2: {
      padding: 16,
    },
    input: {
      marginTop: 2,
    },
    title: {
      paddingBottom: 16,
      textAlign: 'center',
      color: '#404d5b',
      fontSize: 20,
      fontWeight: 'bold',
      opacity: 0.8,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ebebeb',
    },
    container2: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    inputContainer: {
      borderBottomColor: '#0e8bce',
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      borderBottomWidth: 1,
      width:'85%',
      height:45,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'center',
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'100%',
    borderRadius:5,
  //   marginLeft:'20%',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "slategrey",
  },
  saveText: {
    color: 'white',
  }
  });