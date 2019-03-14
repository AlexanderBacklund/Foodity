import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView, ScrollView,
    TouchableOpacity, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import {List, ListItem, ListView, Card, Tile} from 'react-native-elements';
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
    // var user = firebase.auth().currentUser;
    const sessionId = new Date().getTime()
    
    const imageRef = storage.ref('meals').child(`${sessionId}`)
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

export default class RestaurantEditMeals extends React.Component{

constructor(props) {
    super(props);
    this.state = {
        Name: '',
        Description: '',
        Weight: 0,
        Picture: '',
        Portions: 0,
        Taken: false,
        Restaurant: '',
        errorMessage: null
    }
    this.changeFood= this.changeFood.bind(this);
}

    selectImage() {
        this.setState({ uploadURL: '' })
        // var user = firebase.auth().currentUser;
        // const imageRef = storage.ref('images/'+user.uid)
        // storage.ref('images').child(user.uid).getDownloadURL().then(onResolve, onReject);
        ImagePicker.launchImageLibrary({}, response  => {
        uploadImage(response.uri)
            .then(url => {this.setState({ uploadURL: url });this.setState({Picture: url})})
            .catch(error => console.log(error))
        })
    }
    componentDidMount() {
        this.setState({
            Name: this.props.navigation.state.params.food.data.Name,
            Description: this.props.navigation.state.params.food.data.Description,
            Portions: this.props.navigation.state.params.food.data.Portions,
            Weight: this.props.navigation.state.params.food.data.Weight,
            Picture: this.props.navigation.state.params.food.data.Picture,


        });

    }


    changeFood() {
        var ID = this.props.navigation.state.params.food.key;
        console.log(ID);
        firebase.database().ref('FoodList/' + ID).update({
            Name: this.state.Name,
            Description: this.state.Description,
            Portions : this.state.Portions,
            Weight : this.state.Weight,
            Picture: this.state.Picture
          }).then((data) =>{
            this.props.navigation.navigate('RestaurantMyMeals')
            }).catch((error)=>{
                  //error callback
                  console.log('error ' , error)
              });

    }

    render(){
        return(


            <ScrollView>

            <Text style={styles.title}>Edit item</Text>
                <View>
                {
                (() => {
                    switch (this.state.uploadURL) {
                    case null:
                        return null
                    case '':
                        return <ActivityIndicator />
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
                <View>
                    <Card title={this.props.navigation.state.params.food.data.Name} >
                        <TextInput
                            placeholder="New name"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(Name) => this.setState({Name})}
                            />
                    </Card>
                </View>

                <View>
                    <Card title={this.props.navigation.state.params.food.data.Description} >
                        <TextInput
                            placeholder="New Description"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(Description) => this.setState({Description})}
                            />
                    </Card>
                </View>

                <View>
                    <Card title={ this.props.navigation.state.params.food.data.Portions  + "  " + "portions"} >
                        <TextInput
                            placeholder="New amount"
                            keyboardType="number-pad"
                            underlineColorAndroid='transparent'
                            onChangeText={(Portions) => this.setState({Portions})}
                            />
                    </Card>
                </View>
                <View>
                    <Card title={this.props.navigation.state.params.food.data.Weight  +"g per portion"} >
                        <TextInput
                            placeholder="New weight"
                            keyboardType="number-pad"
                            underlineColorAndroid='transparent'
                            onChangeText={(Weight) => this.setState({Weight})}
                            />
                    </Card>
                </View>


                <View>
                    <Button
                        title="Done"
                        onPress= {() => {this.changeFood()}}
                    >
                    </Button>
                </View>

            </ScrollView>




        );
    }



}
const styles = StyleSheet.create ({
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
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
        // borderRadius: 10,
        // borderWidth: 2,
        // borderColor: "#5BB26F",
        // marginBottom:10,
        // alignSelf: 'center',
        // overflow: 'hidden',
        // resizeMode: 'contain',
      }


})

