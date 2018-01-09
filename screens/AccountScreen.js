import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';

import { NavigationActions } from 'react-navigation'


class AccountScreen extends React.Component {
    static navigationOptions = {
        title: 'Account',
        headerTintColor: 'white'
    };
 
    onPress(){
        firebase.auth().signOut().then(() => {
            Alert.alert("logged out");

            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Temp'})
              ]
            })
            this.props.navigation.dispatch(resetAction); 

        })
    } 

    render(){
        return <View style={{flex: 1, backgroundColor: "white", padding: 20}}>
            <Text>Account Page</Text>
            <Button onPress={this.onPress.bind(this)} title="log out" />
        </View>;
    }
}
 
export default AccountScreen;