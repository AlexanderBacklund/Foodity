import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends React.Component {

  state = {
    username: 'Hej',
    password: 'Hejdå'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter your username</Text>
        <TextInput
        placeholder="Insert your username"
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        />
        <Text>Please enter your password</Text>
        <TextInput
        placeholder="Insert your password"
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
