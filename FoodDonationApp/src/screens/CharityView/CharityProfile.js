import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import Firebase from './../../config/FirebaseConfig';
import Geocoder from 'react-native-geocoding';

export default class RestaurantProfile extends Component {
  static navigationOptions = {
    header: null,
    };

    state = {
        currentData: {
            email: '',
            lname: '',
            fname: '',
            orgname: '',
            address: '',
            description: '',
            lat: '',
            lng: ''},
            items: [],
            numberOfPortions : 0,
        };

    async componentWillMount() {
        await this.HowManyPortions();
    }

  componentDidMount() {
    var user = Firebase.auth().currentUser.uid;
    let itemsRef = Firebase.database().ref('UsersList/'+user);
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
    var user = Firebase.auth().currentUser;
    Firebase.database().ref('UsersList/'+user.uid).update(this.state.currentData)
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

    async HowManyPortions(): Promise<number> {
        await Firebase.database().ref('History/').once('value', function(snapshot){
            var myUid = Firebase.auth().currentUser.uid;
            var tempPortions = 0;
            snapshot.forEach(function(childSnapshot){
                var data = childSnapshot.val()
                if(data.user === myUid) {
                    tempPortions = (tempPortions + data.Portions)
                }
            })
            this.setState({
                numberOfPortions: tempPortions
            })
        }.bind(this))
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>

        <Text style={styles.TitleText}> {this.state.items.orgname} </Text>
        <Text style={styles.Text}> Number of portions given to people in need: {this.state.numberOfPortions} </Text>
        </View>
        <View style={styles.botContainer}>
          <ScrollView>
            <View style={styles.container2}>
              <Text>First Name</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.inputs}

                placeholder={this.state.items.fname}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(fname) => this.setState({currentData: {...this.state.currentData, fname: fname}} )}/>
              </View>
              <Text>Last Name</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.state.items.lname}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(lname) => this.setState({currentData: { ...this.state.currentData, lname: lname} } )}/>
              </View>
              <Text>Organisation Name</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.state.items.orgname}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(orgname) => this.setState({currentData: {...this.state.currentData, orgname: orgname}})}/>
              </View>
              <Text>Address</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.state.items.address}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={this.handleAddress}/>
              </View>
              <Text>Description</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.state.items.description}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(description) => this.setState({currentData: {...this.state.currentData, description: description}})}/>
              </View>
              <Text>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.state.items.email}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({currentData: {...this.state.currentData, email: email}})}/>
              </View>
              <TouchableHighlight style={[styles.buttonContainer, styles.saveButton]} onPress={this.writeUserData}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ebebeb',
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    botContainer: {
        flex: 8,
        justifyContent: 'center',
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
      width:'30%',
      borderRadius:30,
    },
    saveButton: {
      marginTop: 20,
      backgroundColor: "#c415bb",
    },
    saveText: {
      color: 'white',
    },
    Text: {
        fontSize: 15,
        color: "#444",
//        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
    TitleText: {
        fontSize: 24,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
});
