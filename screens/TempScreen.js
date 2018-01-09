import React from 'react';
import { BackHandler, Dimensions, Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';

import HomeScreen from 'screens/HomeScreen';

import LoginForm from 'reactnativenav/LoginForm';

import { Icon } from 'react-native-elements'

class TempScreen extends React.Component {
	static navigationOptions = ({navigation}) => ({
        title: navigation.state.params && navigation.state.params.name,
        headerRight: navigation.state.params && navigation.state.params.headerRight
      });


	constructor(props){
		super(props);        
        // this.props.navigation.setParams({ title: 'your content' })
		this.state = {currentUser: null, rendered: <LoginForm {...this.props} /> }
         this.props.navigation.setParams({name: "Login", headerRight: null});
	} 

	componentDidMount(){

		this.fireBaseListener = firebase.auth().onAuthStateChanged((user) => { 

            if(user){ 

                this.props.navigation.setParams({name: "Events", headerRight: 
                    <View style = {{marginRight: 20}}>
                    <Icon 
                      name='account'
                      type='material-community'
                      color='white'
                      onPress={() => this.props.navigation.navigate("Account") }
                    />
                    </View>
                    
                });
            	
                this.setState({currentUser: firebase.auth().currentUser, rendered: <HomeScreen {...this.props} />});                
                this.props.navigation.setParams({ title: 'new' })
            } 

        });
	} 

	componentWillUnmount() {
	   this.fireBaseListener(); 
	}


    render () {    
        // return ({ (this.state.currentUser && <HomeScreen {...this.props} />) || <LoginForm /> } );
        return this.state.rendered;
    }
}

export default TempScreen;