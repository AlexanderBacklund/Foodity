import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Button, Card, Slider } from 'react-native-elements';
//import firebase from 'firebase';
import Modal from "react-native-modal";
import MyFooter from './../../components/CharityComponents/MyFooter.js'
import Firebase from './../../config/FirebaseConfig';

export default class Browse extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            where: {
                lat:null,
                lng:null
            },
            error:null
        }
    }

    geo_success = (position) => {
        console.log(position)
        this.setState({ready:true, where: {lat: position.coords.latitude, lng: position.coords.longitude}})
    }

    geo_error = (err) => {
        console.log(err.message)
        this.setState({error: err.message})
    }

    componentWillMount() {
        let geoOptions = {
            //enableHighAccuracy: true,
            timeOut: 20000,
        };
        this.setState({ready:false, error: null });
        navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error, geoOptions);
    }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
            <Text style={styles.TextNoFood}> USING LALA </Text>
        )}
        { this.state.error && (
            <Text style={styles.TextNoFood}> {this.state.error}</Text>
        )}
        { this.state.ready && (
            <Text style={styles.TextNoFood}>
            Latitude: {this.state.where.lat}
            Longitude: {this.state.where.lng}
            </Text>
        )}
          <MyFooter navigation={this.props.navigation}/>
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
    TextNoFood: {
        textAlignVertical: "center",
        fontSize: 20,
        color: "#444",
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 7,
    }
});
