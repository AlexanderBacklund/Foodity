import React, {Component} from 'react';
import {TextInput, Alert, Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Modal from "react-native-modal";

const images = [
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_124661/cf_259/blomkalsris-med-solrosfron-719531-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_131896/cf_259/amaranth-romsas-720001-liten.jpg"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_109160/cf_259/kramig-soppa-med-broccoli-palsternacka-och-adelost.png"},
    {uri: "https://icase.azureedge.net/imagevaultfiles/id_86557/cf_259/jultallrik-med-sill-717057.png"}
  ]

class RestaurantModal extends Component {
render() {
    const { isModalVisible } = this.props;
    return (

        isModalVisible &&
        <Modal
                   backdropOpacity={Platform.OS === 'android'? 0.2 : 0.7}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Hello!</Text>
              <Image 
              style = {{width: 250, height: 250}}
              source={images[2]}/>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal> 
    )
    }
}


export default RestaurantModal;