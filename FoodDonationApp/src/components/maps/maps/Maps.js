import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


import Cards from './../card/Cards';

const images = [
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_124661/cf_259/blomkalsris-med-solrosfron-719531-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_131896/cf_259/amaranth-romsas-720001-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_109160/cf_259/kramig-soppa-med-broccoli-palsternacka-och-adelost.png"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_86557/cf_259/jultallrik-med-sill-717057.png"}
  ]
  
  const {width, height} = Dimensions.get("window");
  
  const cardHeight = height / 2.8;
  const cardWidth = cardHeight - 50;
  

class Maps extends Component {

        state ={
          focusLocation: {
            latitude: 59.334591,
            longitude: 18.053240,
            latitudeDelta: 0.015,   
            longitudeDelta: 0.0121,
          },
          locationChosen: false,
          markers: [
            {
              coordinate: {
              latitude: 59.334591,
              longitude: 18.053240,
              },
              title: "Blomkål",
              description: "Gul och smakrik.",
              image: images[0],
            },
            {
              coordinate: {
              latitude: 59.344591,
              longitude: 18.073240,
            },
            title: "Romsås",
            description: "God till Lax.",
            image: images[1],
          },{
            coordinate: {
              latitude: 59.324591,
              longitude: 18.083240,
            },
            title: "Spenatsoppa",
            description: "Värmande.",
            image: images[2],
          },
          {
            coordinate: {
              latitude: 59.354591,
              longitude: 18.063240,
            },
            title: "Årets julbord 2018",
            description: "Fortfarande smarrigt.",
            image: images[3],
          },
          ],
          region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          },
        }
      
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
      
      //   updateRestaurantPosition(restaurantPosition){
      //     this.setState({restaurantPosition})
      //   const restaurant = firebase.database().ref('restaurant/' + this.restaurantId)
      //   restaurant.update({restaurantPosition})
      // }
      
      componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
      }
      componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
          let index = Math.floor(value / cardWidth + 0.3); // animate 30% away from landing on the next item
          if (index >= this.state.markers.length) {
            index = this.state.markers.length - 1;
          }
          if (index <= 0) {
            index = 0;
          }
      
          clearTimeout(this.regionTimeout);
          this.regionTimeout = setTimeout(() => {
            if (this.index !== index) {
              this.index = index;
              const { coordinate } = this.state.markers[index];
              this.map.animateToRegion(
                {
                  ...coordinate,
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
      
          const interpolations = this.state.markers.map((marker, index) => {
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
            {marker}
            {this.state.markers.map((marker, index) => {
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={styles.markerWrap}>
                  <View >
                  <Image source={require('./../../../images/FoodityIcon2.png')} style={{width: 50, height: 50}}/>
                  </View>
                </Animated.View>
      
                </MapView.Marker>
              )
            })}
      
               
           </MapView>
      
           <Cards/>
      
           <View style={styles.locateIcon}> 
           <TouchableOpacity onPress={this.getLocationHandler} underlayColor={'transparent'}>
            <Image
              source={require('./../../../images/navigationblack.png')}
            />
          </TouchableOpacity>
           </View>
      
           
      
           
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
        
      });

      export default Maps;