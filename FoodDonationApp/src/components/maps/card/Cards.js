import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, Animated, Image, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Location from './../location/Location'

const {width, height} = Dimensions.get("window");

const cardHeight = height / 2.8;
const cardWidth = cardHeight - 50;

const images = [
  {uri: "https://icase.azureedge.net/imagevaultfiles/id_124661/cf_259/blomkalsris-med-solrosfron-719531-liten.jpg"},
  {uri: "https://icase.azureedge.net/imagevaultfiles/id_131896/cf_259/amaranth-romsas-720001-liten.jpg"},
  {uri: "https://icase.azureedge.net/imagevaultfiles/id_109160/cf_259/kramig-soppa-med-broccoli-palsternacka-och-adelost.png"},
  {uri: "https://icase.azureedge.net/imagevaultfiles/id_86557/cf_259/jultallrik-med-sill-717057.png"}
]

class Cards extends Component {

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
    render () {
        return(
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
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index} onPress>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
                
                <TouchableOpacity style={styles.reserveButton}
                underlayColor='#fff'>
                  <Text>More info</Text>
                </TouchableOpacity>
                
            </View>
          ))}
        </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create ({
scrollView: {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  paddingVertical: 10,
},
endPadding: {
  paddingRight: width - cardWidth,
},
card: {
  padding: 10,
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
}
});
export default Cards;