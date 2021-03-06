import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight,RefreshControl} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Button, Card, Slider } from 'react-native-elements';
import Modal from "react-native-modal";
import Firebase from './../../config/FirebaseConfig';

export default class CharityHistory extends Component {
    static navigationOptions = {
        header: null,
        };
    constructor() {
        super();
        this.state = {
            numberOfPortions: 0
        }
    }

    async componentWillMount() {
        await this.HowManyPortions();
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
       return(
            <View style= {{flex:1}}>
                <View style={styles.container}>
                    <Text style={styles.Text}> Number of portions given to people in need: {this.state.numberOfPortions} </Text>
                </View>
            </View>
       )

   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ebebeb'
},
    Text: {
        fontSize: 24,
        color: "#444",
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
    }
});
