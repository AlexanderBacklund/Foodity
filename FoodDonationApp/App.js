import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

  



type Props = {};
class App extends Component<Props> {

  state ={
    focusLocation: {
      latitude: 59.334591,
      longitude: 18.063240,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    locationChosen: false
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


  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusLocation} />
    }
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
     <MapView.Marker 
            coordinate={{latitude: 59.334591, longitude: 18.063240}}
            title={"title"}
            description={"description"}
         />
         
     </MapView>
     <View style={styles.locateButton}> 
     <Button 
     title="Locate me" onPress={this.getLocationHandler}/>
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
  locateButton: {
    bottom: 50
  }
});

export default App; 