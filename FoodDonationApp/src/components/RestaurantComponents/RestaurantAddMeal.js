import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView, TouchableOpacity,
  ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Login from './../../screens/Login';
import RestaurantMyMeals from './../../screens/RestaurantView/RestaurantMyMeals';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
// const firebaseConfig = {
//   apiKey: "AIzaSyCDNg-6wLAG9uO695FAyMlvWlnjWEBsY50",
//   authDomain: "food-donation-bcce1.firebaseapp.com",
//   databaseURL: "https://food-donation-bcce1.firebaseio.com",
//   projectId: "food-donation-bcce1",
//   storageBucket: "food-donation-bcce1.appspot.com",
//   messagingSenderId: "474995894111",
// };

// const app = firebase.initializeApp(firebaseConfig);
// firebase storage is where the profile image will be saved
const storage = firebase.storage();

// Prepare Blob support for image
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class RestaurantAddMeals extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        Name: '',
        Description: '',
        Weight: 0,
        Picture: 'https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/meals%2Fimages.png?alt=media&token=b27ac614-9f7a-4260-ac17-3e7c73af47bb',
        Portions: 0,
        Taken: false,
        Restaurant: '',
        errorMessage: null
    }
    this.writeFoodData = this.writeFoodData.bind(this);
}

uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri
    let uploadBlob = null
    // var user = firebase.auth().currentUser;
    var user = this.props.navigation.state.params.food.key;
    const sessionId = new Date().getTime()

    const imageRef = storage.ref('meals').child(`${user}`)
   console.log("Image ref", sessionId);

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
        console.log("url: ", url);
        resolve(url)
      })
      .catch((error) => {
        console.log("error: ", error);
        reject(error)
    })
  })
}

selectImage() {
  this.setState({ uploadURL: '' })
  // var user = firebase.auth().currentUser;
  // const imageRef = storage.ref('images/'+user.uid)
  // storage.ref('images').child(user.uid).getDownloadURL().then(onResolve, onReject);
  ImagePicker.launchImageLibrary({}, response  => {
  this.uploadImage(response.uri)
      .then(url => {this.setState({ uploadURL: url });this.setState({Picture: url})})
      .catch(error => console.log(error))
  })
}
    componentDidMount() {

          var myUid = firebase.auth().currentUser.uid;
          this.setState({
            Restaurant : myUid
          });
          //firebase.database().ref('UsersList/' + myUid).once('value').then(function(snapshot){
           //     this.props.navigation.navigate((snapshot.val().lname === 'Progress') ? 'Discover' : 'RestaurantMyMeals')
          }



  writeFoodData(Name, Description, Weight, Picture, Portions, Taken, Restaurant) {
    firebase.database().ref('FoodList/').push({
        Name,
        Description,
        Weight,
        Picture,
        Portions,
        Taken,
        Restaurant

    }).then((data)=>{
        this.props.navigation.navigate('RestaurantMyMeals')

    }).catch((error)=>{
        console.log('error' , error)
    })
   }



  render() {
    return (

        <KeyboardAvoidingView style={styles.container}>
        <View>
                {
                (() => {
                    switch (this.state.uploadURL) {
                    case null:
                        return null
                    case '':
                        return (
                          <TouchableOpacity  style={styles.avatarContainer} >
                        <ActivityIndicator />
                        </TouchableOpacity>
                        )
                    default:
                        return (
                            <TouchableOpacity  style={styles.avatarContainer} onPress={ () => this.selectImage() }>

                            <Image
                            style={styles.avatar}
                                resizeMode="stretch"
                                source={{uri: this.state.Picture}}/>
                        </TouchableOpacity>
                        )
                        }
                    })()
                }

        </View>
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
              onChangeText={(Portions) => this.setState({Portions})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Description"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(Description) => this.setState({Description})}/>
        </View>


        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Weight per portion"
              keyboardType="number-pad"
              underlineColorAndroid='transparent'
              onChangeText={(Weight) => this.setState({Weight})}/>
        </View>
        {console.log(this.state)}
        {this.state.errorMessage &&
          <Text style={{ color: 'red', marginLeft: 40, marginRight: 20, marginBottom: 20 }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() =>this.writeFoodData(this.state.Name,this.state.Description,this.state.Weight,this.state.Picture,this.state.Portions, this.state.Taken, this.state.Restaurant)}>
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
  },
  avatarContainer: {
      marginTop:10,
      width: 150,
      height: 150,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#e2e2e2",
      marginBottom:10,
      alignSelf: 'center',
      overflow: 'hidden',
      // resizeMode: 'contain',
    },
    avatar: {
      width: 150,
      height: 150,
    }
});
