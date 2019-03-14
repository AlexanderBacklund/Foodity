import React, {Component} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 1500)
    }
    static navigationOptions = {
        header: null,
        };
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                source={require('./../../images/FoodityWhite.png')}>
                </Image>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6FDB88',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 256,
        height: 136,
    }
})