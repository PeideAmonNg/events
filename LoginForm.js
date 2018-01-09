import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';
import TitledInput from './TitledInput';
import Spinner from './Spinner';

import isemail from 'email-format-check';

import { NavigationActions } from 'react-navigation'

class LoginForm extends React.Component {
    static navigationOptions = ({
        title: "Login"
      });

    constructor(props){
        super(props);

        this.state = { email: '', password: '', error: '', loading: false, formMode: "log in"};


        console.log("in loginform constructor")
        

        // var unsubscribe = firebase.auth().onAuthStateChanged((user) => { 
        //     console.log("firebase.auth.currentUser");
        //     console.log(user);

        //     if(user){ 
        //         this.reset();
 
        //         // this.props.navigation.navigate("Home"); 
        //     }

        // });

        // unsubscribe();

    }
    
    onLoginPress() {
        console.log("email");
        console.log(this.state);
        var error = "";
        if(!isemail(this.state.email)){
            error = "enter email";
        }
        if(!this.state.password){
            if(error){
                error += "\nenter password";
            }
        }

        if(error){
            this.setState({error: error})
            return;
        }

        this.setState({ error: '', loading: true });
        console.log("onloginpress"); 

        const { email, password } = this.state;



        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false }); Alert.alert("Logged in: " + firebase.auth().currentUser.displayName + "(" + firebase.auth().currentUser.uid) + ")";})
            .catch(() => {
                //Login was not successful, let's create a new account
                // firebase.auth().createUserWithEmailAndPassword(email, password)
//                    .then(() => { this.setState({ error: '', loading: false }); Alert.alert("account created"); this.props.navigation.navigate("Home"); })
                    // .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    // });
            });
        
    }
    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this.onLoginPress.bind(this)} title={this.state.formMode} />;
    }

    renderOtherButton(){
        return <Text onPress={this.onPress.bind(this)} style={{ marginTop: 10, alignSelf: 'center' }}>Sign Up</Text>;
    }

    onPress(){
//        var formMode = this.state.formMode == 'log in' ? 'register' : 'log in';
//        var otherButtonText = formMode == 'log in' ? 'register' : 'log in';
//        var n = {
//            email: this.state.email,
//            password: this.state.password,
//            error: this.state.error,
//            loading: this.state.loading,
//            formMode: formMode,
//            otherButtonText: otherButtonText
//        };
//        this.setState(n);
//        this.props.navigation.setParams({ title: "sd" })
//        console.log("onpress")
            const {navigate} = this.props.navigation;
            navigate('SignUp');
    }

    reset(){
        console.log("in reset");
        const resetAction = NavigationActions.reset({ 
          index: 0, 
          actions: [ 
            NavigationActions.navigate({ routeName: 'Events'})
          ],
          key: null
        })  
        this.props.navigation.dispatch(resetAction) 


    }

    componentWillReceiveProps(){
        
    }

    componentDidMount(){
        console.log("in loginform constructor");
        // this.props.navigation.setParams({ title: 'your content' })
        
    }


    render() {

        return (
            <View style={{padding: 40, flex: 1, backgroundColor: "white"}}>
                <TitledInput
                    label='Email Address'
                    placeholder='you@domain.com'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TitledInput
                    label='Password'
                    autoCorrect={false}
                    placeholder='*******'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                {this.renderButtonOrSpinner()}
                {this.renderOtherButton()}
            </View>
        );
    }
}
const styles = {
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export default LoginForm;