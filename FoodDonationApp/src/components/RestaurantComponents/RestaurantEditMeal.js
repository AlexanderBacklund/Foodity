import React from 'react';
import {CheckBox, StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,KeyboardAvoidingView, ScrollView} from 'react-native';
import firebase from 'firebase';
import {List, ListItem, ListView, Card, Tile} from 'react-native-elements';


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
    componentDidMount() {
        this.setState({
            Name: this.props.navigation.state.params.food.data.Name,
            Description: this.props.navigation.state.params.food.data.Description,
            Portions: this.props.navigation.state.params.food.data.Portions,
            Weight: this.props.navigation.state.params.food.data.Weight,


        });

    }


    changeFood() {
        var ID = this.props.navigation.state.params.food.key;
        console.log(ID);
        firebase.database().ref('FoodList/' + ID).update({
            Name: this.state.Name,
            Description: this.state.Description,
            Portions : this.state.Portions,
            Weight : this.state.Weight
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
                    <Card title={"Name:" + "  " + this.props.navigation.state.params.food.data.Name} >
                        <TextInput
                            placeholder="New name"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(Name) => this.setState({Name})}
                            />
                    </Card>
                </View>

                <View>
                    <Card title={"Description:" + "  " + this.props.navigation.state.params.food.data.Description} >
                        <TextInput
                            placeholder="New Description"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(Description) => this.setState({Description})}
                            />
                    </Card>
                </View>

                <View>
                    <Card title={"Portions:" + "  " + this.props.navigation.state.params.food.data.Portions} >
                        <TextInput
                            placeholder="New amount"
                            keyboardType="number-pad"
                            underlineColorAndroid='transparent'
                            onChangeText={(Portions) => this.setState({Portions})}
                            />
                    </Card>
                </View>
                <View>
                    <Card title={"Portions:" + "  " + this.props.navigation.state.params.food.data.Portions} >
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
    }


})

