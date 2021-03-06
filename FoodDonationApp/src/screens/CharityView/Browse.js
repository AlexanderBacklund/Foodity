import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight,RefreshControl, ImageBackground} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Button, Card, Slider } from 'react-native-elements';
import Modal from "react-native-modal";
import Firebase from './../../config/FirebaseConfig';

 const {width, height} = Dimensions.get("window");

export default class Browse extends Component {
    static navigationOptions = {
        header: null,
        };
    constructor() {
        super();
        this.state = {
            ready: false,
            where: {
                lat:null,
                lng:null
            },
            error:null,
            ItemsWithCoordinates: [],
            refreshing: false,
            orderedFood: {
                lat: null,
                lng: null,
                dist: null,
            },
        }
    }

    _onRefresh = () => {
      console.log("HEJ")
      this.loadFood()
    this.setState({refreshing:true});
        fetchData().then(()=>{
            this.setState({refreshing:false})
        });
    }

    async componentWillMount() {
        await navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error, geoOptions);
        this._navListener = this.props.navigation.addListener('didFocus', () => {
           this.loadFood()
        });
        let geoOptions = {
            timeOut: 20000,
        };
        this.setState({ready:false, error: null });
    }

    geo_success = (position) => {
        this.setState({ready:true, where: {lat: position.coords.latitude, lng: position.coords.longitude}})
    //    this.pythagoras(position)
    }

    geo_error = (err) => {
        console.log(err.message)
        this.setState({error: err.message})
    }

    _handleBookFood = (item) => {
        let bookedPortions = item['data'].Portions
        var foodListRef = Firebase.database().ref('FoodList/' + item['key'])
        foodListRef.update({Portions: 0 })
        this.addPartOfFood(item)
        this.loadFood()
    }

    addPartOfFood = (item) => {
        Firebase.database().ref('BookedFood/').push({
            Name: item['data'].Name,
            Description: item['data'].Description,
            Weight: item['data'].Weight,
            Picture: item['data'].Picture,
            Portions: parseInt(item['data'].Portions),
            Taken: !item['data'].Taken,
            Restaurant: item['data'].Restaurant,
            Charity: Firebase.auth().currentUser.uid,
            FromWhatOrder: item.key
        }).then((data) => {
            console.log('Success')
        }).catch((error) => {
            console.log('error', error)
        })
    }

    async loadFood() {
        let allFood = [];
        var food = {}
        var tempFoodList = []
        var restaurantsWithFoodTemp = []
        var restaurantTemp = {}
        var tempRestaurantList= []

        await Firebase.database().ref('FoodList/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                food = {
                    key:  childSnapshot.key,
                    data: childSnapshot.val(),
                }
                restaurantsWithFoodTemp.push(childSnapshot.val().Restaurant)
                tempFoodList.push(food)
            });
        }.bind(this));

        await Firebase.database().ref('UsersList/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (restaurantsWithFoodTemp.includes(childSnapshot.key)){
                    restaurantTemp = {
                        data: childSnapshot.val(),
                        key: childSnapshot.key,
                    }
                    tempRestaurantList.push(restaurantTemp)
                }
            });
        }.bind(this));

        var newWayOfRepFoodItem = {}
        var listOfNewWayOfRepItem = []
        try {
            tempFoodList.map((foodItem,index) => {
                if(foodItem['data'].Portions > 0) {
                    var tempCoord = this.getCoordinatesForItem(foodItem['data'], tempRestaurantList)
                    var hyp = this.pythagoras(tempCoord)
                    newWayOfRepFoodItem = {
                        key: foodItem.key,
                        data: foodItem.data,
                        coordinates: tempCoord,
                        hyponusa: hyp
                    }
                    listOfNewWayOfRepItem.push(newWayOfRepFoodItem)
                }
        })
        listOfNewWayOfRepItem.sort(function(a, b){return a.hyponusa-b.hyponusa})
        this.setState ({
            ItemsWithCoordinates: listOfNewWayOfRepItem
        })
        } catch (e) {
                console.log('in Browser, loadFood function ' + e.message)
        } finally {

        }
    }

    getCoordinatesForItem = (item, restaurants) => {
        var coordinates = {}
        restaurants.map((restaurant) => {
            if(item.Restaurant == restaurant.key) {
                coordinates = {lat: restaurant['data'].lat, lng: restaurant['data'].lng}
                return(coordinates)
            }
        })
        return (coordinates)
    }

    checkIfRestaurantHaveFood = (index) => {
        let foodList = []
        let currentKey = this.state.allRestaurantKeys[index]
        this.state.food.map((marker) => {
            if(marker['data'].Restaurant === currentKey) {
                foodList.push(marker);
            };
        });
        return foodList;
    }

    pythagoras = (coordinates) => {
    //    a^2 + b^2 = c^2
        let currentPosition = {
            lat: this.state.where.lat,
            lng: this.state.where.lng
       }
        var hyp = Math.sqrt(Math.pow((currentPosition.lat - coordinates.lat),2) + Math.pow((currentPosition.lng - coordinates.lng),2))
        return(hyp)
    }

    myFood = () => {
        if (this.state.ItemsWithCoordinates.length != 0) {
            return this.state.ItemsWithCoordinates.map(function(food, i){
            return(
                <View style={{flex:1}} key={i} >
                    <View style={styles.imageContainer}>
                        <ImageBackground
                        source={{uri: "https://firebasestorage.googleapis.com/v0/b/food-donation-bcce1.appspot.com/o/meals%2F"+food.key+"?alt=media&token=3241115a-d6ab-42d4-991a-d041d2cf1373"}}
                        style={styles.cardImage}
                        >
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>{food['data'].Name}</Text>
                            <Text style={styles.Text}>Descriptions: {food['data'].Description}</Text>
                            <Text style={styles.Text}>Portions: {food['data'].Portions}</Text>
                            <Button title="Book" type="clear" titleStyle={{color:"#6FDB88"}} onPress={() => this._handleBookFood(food)} />
                        </View>
                    </ImageBackground>
                    </View>

                </View>
                );
            }.bind(this));
        } else {
            return(
                <Text style={styles.TextNoFood}> There are no food for grab</Text>
            )
        }
    }

  render() {
    return (
     <View style={styles.container}>
        <ScrollView style={{flex:1}}
            RefreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    _onRefresh={this._onRefresh}
                />
            }
        >

            {this.myFood()}
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
    },
    Text: {
        fontSize: 14,
        color: "#ffffff",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
    titleText: {
        fontSize: 24,
        color: "#ffffff",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
    TextNoFood: {
        textAlignVertical: "center",
        fontSize: 20,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    },
    cardImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: width,
        //height: "100%",
        //alignSelf: "center",
    },
    card: {
        flex:1,
        padding: 3,
        marginHorizontal: 20,
    },

    imageContainer: {
      marginTop:10,
      width: width,
      height: 250,
//      marginBottom:10,
      alignSelf: 'center',
//      overflow: 'hidden',

    },

    textContainer: {
        flex: 1,
        backgroundColor: 'rgba(54, 54, 54, 0.4)',
        width:width,
        position: 'absolute',
        bottom: 0
    }
});
