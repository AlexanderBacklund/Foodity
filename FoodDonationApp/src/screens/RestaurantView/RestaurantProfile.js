import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableHighlight,Image, TouchableOpacity,
  ActivityIndicator } from 'react-native';
import RestaurantFooterFooter from './../../components/RestaurantComponents/RestaurantFooter';
import { Avatar } from 'react-native-elements';
import MyHeader from './../../components/MyHeader';
import firebase from './../../config/FirebaseConfig';
import Geocoder from 'react-native-geocoding';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Sae, Kaede} from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

// firebase storage is where the profile image will be saved
const storage = firebase.storage();


// Prepare Blob support for image
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri
    let uploadBlob = null
    var user = firebase.auth().currentUser;
    const imageRef = storage.ref('images/'+user.uid)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

export default class RestaurantProfile extends Component {


  state = {uploadURL:'https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b662115c-e3f7-438b-beab-715463f3d7a9',
  currentData: {email: '', lname: '', fname: '', orgname: '', address: '', description: '',lat: '', lng: ''}, items: []};


  selectImage() {
    this.setState({ uploadURL: '' })
    var user = firebase.auth().currentUser;
    // const imageRef = storage.ref('images/'+user.uid)
    // storage.ref('images').child(user.uid).getDownloadURL().then(onResolve, onReject);
    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }
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
    // console.log("this.state.items");
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
              // Check if lat or lng not set correctly, then reset to old value
              if(this.state.currentData.lng == '' || this.state.currentData.lat == '') {
                this.setState({currentData: {...this.state.currentData, lat: this.state.items.lng}});
                this.setState({currentData: {...this.state.currentData, lat: this.state.items.lat}});
                this.setState({currentData: {...this.state.currentData, address: this.state.items.address}});
              }
          })
          .catch(error => console.warn(error));
        }
  render() {
    return (

      <View style={styles.container}>

        <MyHeader />
          <ScrollView>
            <View style={[styles.card2]}>
           <Text style={styles.title}>Profile</Text>
           {
          (() => {
            switch (this.state.uploadURL) {
              case null:
                return null
              case '':
                return <ActivityIndicator />
              default:
              var user = firebase.auth().currentUser;
              var imageUrl = storage.ref('images').child(`${user.uid}`).getDownloadURL().then((url) => {
                // console.log(url)
                this.setState({ uploadURL: url })
                // return url;
              })
              .catch((error) => {
                // console.log(error)
                // this.setState({ uploadURL: 'https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/images%2Fdefault.jpg?alt=media&token=b662115c-e3f7-438b-beab-715463f3d7a9' })
            });
            // console.log(imageUrl)
              //
              // console.log(this.state.uploadURL)
                return (
                  <TouchableOpacity onPress={ () => this.selectImage() } style={styles.avatarContainer}>

           <Image style={styles.avatar}
           resizeMode="stretch"
                  source={{uri: this.state.uploadURL}}/>
          </TouchableOpacity>
                )
            }
          })()
        }
           <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'First Name'}
              inputPadding={16}
              labelStyle={{
              color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                color: 'slategrey',
                // borderWidth: 2,
                // borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.fname}
              onChangeText={(fname) => this.setState({currentData: {...this.state.currentData, fname: fname}} )}
            />
            <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'Last Name'}
              inputPadding={16}
              labelStyle={{
                color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                color: 'slategrey',
                // borderWidth: 2,
                // borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.lname}
              onChangeText={(lname) => this.setState({currentData: { ...this.state.currentData, lname: lname} } )}
            />
            <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'Organization Name'}
              inputPadding={16}
              labelStyle={{
                color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                color: 'slategrey',
                // borderWidth: 2,
                // borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.orgname}
              onChangeText={(orgname) => this.setState({currentData: {...this.state.currentData, orgname: orgname}})}
            />
            <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'Address'}
              inputPadding={16}
              labelStyle={{
                color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                color: 'slategrey',
                // borderWidth: 2,
                // borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.address}
              onChangeText={this.handleAddress}
            />
            <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'Description'}
              inputPadding={16}
              labelStyle={{
                color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                // color: 'slategrey',
                // borderWidth: 2,
                borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.description}
              onChangeText={(description) => this.setState({currentData: {...this.state.currentData, description: description}})}
              />
            <Kaede
              style={styles.input}
              inputStyle={{color:'slategrey',}}
              label={'Email'}
             inputPadding={16}
              labelStyle={{
                color: 'black',
              backgroundColor: '#5BB26F',
              }}
              inputStyle={{
                color: 'slategrey',
                // borderWidth: 2,
                // borderColor: 'slategrey',
                // backgroundColor: '#ededed',
              }}
              defaultValue={this.state.items.email}
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
      padding: 0,
      backgroundColor: '#6FDB88',
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
  avatarContainer: {
    marginTop:10,
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5BB26F",
    marginBottom:10,
    alignSelf: 'center',
    overflow: 'hidden',
    // resizeMode: 'contain',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  saveButton: {
    marginTop: 20,
    width: '40%',
    alignSelf: 'center',
    backgroundColor: "#5BB26F",
    borderRadius:10
  },
  saveText: {
    color: 'white',
  }
  });
