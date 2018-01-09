import React from 'react'; 
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; 
import { NavigationActions } from 'react-navigation'

import Login from './LoginForm';
import Events from 'screens/HomeScreen';
import Temp from 'screens/TempScreen';
import Account from 'screens/AccountScreen';
import NewEvent from 'screens/NewEventScreen';
import Event from 'screens/EventScreen';
import EditEvent from 'screens/EditEventScreen';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
        title: 'Home',
      };

  onPress(){

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Details'})
      ]  
    })  
    this.props.navigation.dispatch(resetAction) 
  }

  componentDidMount(){
    console.log("homescreen")
  }
 
  render() { 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
         <Button
          onPress={this.onPress.bind(this)}
          title="Go to Details"
        />
      </View>
    );
  }
}
 

class DetailsScreen extends React.Component {
  static navigationOptions = {
        title: 'Details',
      };

  constructor(props) {
    super(props);
  }
 
  componentDidMount(){
    console.log("DetailsScreen")
  } 

  onPress(){

    const resetAction = NavigationActions.reset({ 
      index: 0, 
      actions: [ 
        NavigationActions.navigate({ routeName: 'Temp', params: {name: "Login"} })
      ]
    })  
    this.props.navigation.dispatch(resetAction) 
  }

  render() { 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Button
      onPress={this.onPress.bind(this)}
      title="Go to Home"
    />
  </View>
    );
  }
}

var color = "white";
var backgroundColor = "#115737";

const RootNavigator = StackNavigator({  
  Temp: {
    screen: Temp,
  },Home: {
    screen: HomeScreen    
  },
  Details: {
    screen: DetailsScreen
  },
  Login: {
    screen: Login,
  },
  Account: {
    screen: Account,
  },
  Event: {
    screen: Event,
  },
  NewEvent: {
    screen: NewEvent,
  },
  EditEvent: {
    screen: EditEvent,
  },
  Events: {
    screen: Events
  }
}, {
navigationOptions: {  
      headerTitleStyle: { 
        color: color
      },
      headerStyle: { 
        backgroundColor: backgroundColor
        
      }
}, 
}
    ); 

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5, 
  },
});



export default RootNavigator;



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }