import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';
import TitledInput from './TitledInput';
import Spinner from './Spinner';

class RegisterForm extends React.Component {
    static navigationOptions = {
            title: "Sign Up",
    };

    constructor(props){
        super(props);
        this.state = { email: '', password: '', error: '', loading: false, formMode: "sign up"};
    }
    onLoginPress() {
        this.setState({ error: '', loading: true });
        console.log("onloginpress");

        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false });
                var newKey = firebase.database().ref().child("users").push().key;
                 var updates = {};
                 updates['/users/' + newKey] = {createdAt: firebase.database.ServerValue.TIMESTAMP};
                 firebase.database().ref().update(updates);
                this.props.navigation.navigate("Home");
                Alert.alert("account created") })
            .catch(() => {
                //Login was not successful
                this.setState({ error: 'Authentication failed.', loading: false });
            });
    }
    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return <Button onPress={this.onLoginPress.bind(this)} title={this.state.formMode} />;
    }

    renderOtherButton(){
        return <Text onPress={this.onPress.bind(this)} style={{ marginTop: 10, alignSelf: 'center' }}>Log In</Text>;
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
            navigate('Login');
    }

    render() {
        return (
            <View style={{padding: 40}}>
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

export default RegisterForm;