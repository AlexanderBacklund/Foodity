import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Button, Card, Slider } from 'react-native-elements';
//import firebase from 'firebase';
import Modal from "react-native-modal";
import MyFooter from './MyFooter.js'
import Firebase from './../../config/FirebaseConfig';

const images = [
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_124661/cf_259/blomkalsris-med-solrosfron-719531-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_131896/cf_259/amaranth-romsas-720001-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_109160/cf_259/kramig-soppa-med-broccoli-palsternacka-och-adelost.png"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_86557/cf_259/jultallrik-med-sill-717057.png"}
  ]

  const {width, height} = Dimensions.get("window");

  const cardHeight = height / 3.5;
  const cardWidth = width - 50;


class Maps extends Component {
    state ={
        focusLocation: {
            latitude: 59.838601,
            longitude: 17.6113775,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        locationChosen: false,
        region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        resturantData: [],
        allRestaurantKeys: [],
        isModalVisible: false,
        currentPressedRestaurant: 0,
        currentPressedRestaurantsFood: [],
        value: 0,
        slideValue: 0,
        food: {},
        restaurant: [],
    }
    static navigationOptions = {
      header: null,
      };

    pickLocationHandler = event => {
      const coords = event.nativeEvent.coordinate;
      this.map.animateToRegion({
        ...this.state.focusLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      });
      this.setState(prevState => {
        return {
          focusLocation: {
            ...prevState.focusLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          locationChosen: true
        };
      });
    }


    getLocationHandler = () => {
      navigator.geolocation.getCurrentPosition(pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
    err => {
      console.log(err);
      alert("Fetching the Position failed, please pick one manually!");
    })
    }

    _handleModalPress = (item, value) => {
        let newPortions = item['data'].Portions - value
        var foodListRef = Firebase.database().ref('FoodList/' + item['key'])
        foodListRef.update({Portions : newPortions})
        this.addPartOfFood(item, value)
        this.loadFood()
        this._toggleModal(0,0)
    }

    addPartOfFood = (item, value) => {
        Firebase.database().ref('BookedFood/').push({
            Name: item['data'].Name,
            Description: item['data'].Description,
            Weight: item['data'].Weight,
            Picture: item['data'].Picture,
            Portions: value,
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

    async _toggleModal(modalRestData, index) {
        await this.loadFood()
        let restaurantData = 0
        if (modalRestData != 0) {
            restaurantData = modalRestData['data']
        } else {
            restaurantData = 0
        }
        let foods = await this.checkIfRestaurantHaveFood(index)
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            currentPressedRestaurant: restaurantData,
            currentPressedRestaurantsFood: foods,
            value: 0
        })
    }

    async loadFood() {
        var food = {}
        var testFoodList = []
        await Firebase.database().ref('FoodList/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let data = childSnapshot.val()

                if(data.Portions > 0) {

                    food = {
                        data: childSnapshot.val(),
                        key:  childSnapshot.key
                    }
                    testFoodList.push(food)
                }
            });
            this.setState ( {
              food:testFoodList
            })
        }.bind(this));
    }

    async loadRestaurants() {
        await Firebase.database().ref('UsersList/').once('value', function(snapshot) {
            let allResturant = [];
            var restaurantTemp = {};
            var listRestaurant = []
            let allRestaurantKeysTemp = []
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().typeOfUser === 'Restaurant'){
                    restaurantTemp = {
                        data: childSnapshot.val(),
                        key: childSnapshot.key
                    }
                    listRestaurant.push(restaurantTemp)
                    var childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    allResturant.push(childData);
                    allRestaurantKeysTemp.push(childKey)
                }
            })
            this.setState ({
              resturantData: allResturant,
              allRestaurantKeys: allRestaurantKeysTemp,
              restaurant: listRestaurant
            })
        }.bind(this))
    }

    async componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);

        await this.loadFood();
        await this.loadRestaurants();
    }

    componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / cardWidth + 0.3); // animate 30% away from landing on the next item

      if (index >= this.state.resturantData.length) {
        index = this.state.resturantData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const coordinate  = this.state.resturantData[index];
          this.map.animateToRegion(
            {
              latitude: coordinate.lat,
              longitude: coordinate.lng,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

  }

    render() {


      let marker = null;

      if (this.state.locationChosen) {
        marker = <MapView.Marker coordinate={this.state.focusLocation} />
      }

      const interpolations = this.state.resturantData.map((marker, index) => {
        const inputRange = [
          (index - 1) * cardWidth,
          index * cardWidth,
          ((index + 1) * cardWidth),
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
      });
      return (
        <View
        style={styles.container}>
        {this.componentDidMount}
          <MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
         style={styles.map}
         initialRegion={this.state.focusLocation}
         //region={this.state.focusLocation}
         onPress={this.pickLocationHandler}
         ref={ref => this.map = ref}
        >

        {this.state.resturantData.map((marker, index) => {
          return (
            <MapView.Marker key={index} coordinate={{latitude: marker.lat, longitude: marker.lng}}>


            <Animated.View style={styles.markerWrap}>
              <View >
              <Image source={require('./../../../images/FoodityIcon2.png')} style={{width: 50, height: 50}}/>
              </View>
            </Animated.View>

            </MapView.Marker>
          )
        })}


       </MapView>

       <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: this.animation,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      style={styles.scrollView}
      contentContainerStyle={styles.endPadding}
    >
      {this.state.restaurant.map((marker, index) => (

        <View style={styles.card} key={index} onPress>
          <Image
            source={marker['data'].image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.textContent}>
            {console.log(marker)}
            <Text numberOfLines={1} style={styles.cardtitle}>{marker['data'].orgname}</Text>
            <Text numberOfLines={1} style={styles.cardDescription}>
              {marker['data'].description}
            </Text>
          </View>

            <TouchableOpacity style={styles.reserveButton}
            underlayColor='#fff'
            onPress={() => this._toggleModal(marker, index)}
            >
              <Text>More info</Text>
            </TouchableOpacity>



        </View>
      ))}
    </Animated.ScrollView>

       <View style={styles.locateIcon}>
       <TouchableOpacity onPress={this.getLocationHandler} underlayColor={'transparent'}>
        <Image
          source={require('./../../../images/navigationblack.png')}
        />
      </TouchableOpacity>
       </View>

       <Modal isVisible={this.state.isModalVisible}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}>
            <ScrollView>
                <View style={styles.modalContent}>
                    <Text> {this.state.currentPressedRestaurant.orgname} </Text>
                    <Text> {this.state.currentPressedRestaurant.description} </Text>
                    {this.state.currentPressedRestaurantsFood.map((marker, index) => (
                    <View>
                        <Card style={styles.modalcard} title={marker['data'].Name}>
                            <Text style={styles.modalText}>{marker['data'].Description}</Text>
                            <Text style={styles.modalText}>Total ammount of portions: {marker['data'].Portions}</Text>
                            <Slider
                                value={0}
                                maximumValue={marker['data'].Portions}
                                step={1}
                                onValueChange={value => {this.setState({ value: value })}}
                                />
                            <Text>Portions: {this.state.value}</Text>
                            <Button raised title="Book" type="outline" onPress={() => this._handleModalPress(marker, this.state.value)}/>
                        </Card>
                        </View>
                    ))}
                    <Button title="Hide Modal" onPress={() => this._toggleModal(0, 0)} type="outline"
                    buttonStyle={backgroundColor= "#000000"}/>
                </View>
            </ScrollView>
        </Modal>


    <MyFooter navigation={this.props.navigation} />
      </View>




      );
    }
  }

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    marker: {
        width: 24,
        height: 24,
        borderRadius: 24,
        backgroundColor: "#5eb56a",
    },

    locateIcon: {
        bottom: 600,
        left: -170,
    },

    scrollView: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },

    endPadding: {
        paddingRight: width - cardWidth,
    },

    card: {
        flex:1,
        padding: 3,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: cardHeight,
        width: cardWidth,
        overflow: "hidden",
        borderRadius: 10,
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    textContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardtitle: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },

    cardDescription: {
        fontSize: 12,
        color: "#444",
    },

    reserveButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
        backgroundColor:'#5eb56a',
        borderRadius: 10
    },

    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: "rgba(230, 245, 223, 1)",
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalCard: {
        padding: 5,
        //elevation: 2,
        marginHorizontal: 13,
        height: cardHeight,
        width: cardWidth,
        overflow: "hidden",
        borderRadius: 5,
    },
    modalText: {
        fontSize: 14,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,

    }
});

      export default Maps;
