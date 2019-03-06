import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';


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
}

    render(){
        return(

            <Text>{this.props.navigation.state.params.food.data.Name}</Text>





        );
    }



}

