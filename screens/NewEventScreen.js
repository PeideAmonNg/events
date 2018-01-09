import React from 'react';
import { TimePickerAndroid, Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;

import styles from 'reactnativenav/styles';

import options from 'reactnativenav/formOptions';

import { NavigationActions } from 'react-navigation'    

class NewEventScreen extends React.Component {
    static navigationOptions = {
        title: 'New Event',
        headerTintColor: 'white',
    };

    constructor(props){
       super(props);

       value = {};
       countries = {empty: "empty", nonempty: "nonempty"};
       this.state = { value, type: this.getType(value, countries), countries: countries };

        console.log("in constructor");
        console.log(this.state.countries);

    }


    componentWillMount(){
        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json())
        .then((r) => {

            console.log("in componentDidMount");
            console.log(r);

            var countries = {};
            for(var key in r){
                countries[r[key].alpha2Code] = r[key].name;
            }

            console.log(countries);

            var tempState = {};

            for(var key in this.state){
                tempState[key] = this.state[key];
            }

            tempState.countries = countries;
            console.log("printing tempState");
            console.log(tempState);
            console.log("printed tempState");
            this.setState(tempState);

            console.log("printing realstate");
            console.log(this.state);
            console.log("printed realstate");

            var tempVal = this.state.value;
            tempVal = {"shit": "dung"};
            var tempType = this.state.type;
            const Admission = t.enums({
                        F: 'Free',
                        NF: '$'
                      });
            Region = t.enums(countries);
            tempType = this.state.type;
//            this.setState({ value : this.state.value, type: tempType, countries: this.state.countries});


            if (this.state.value.admission === 'NF') {
              tempType =  t.struct({
               name: t.String,
               desc: t.String,
               date: t.Date,
               venue: t.String,
               address: t.String,
               region: Region,
               admission: Admission,
               cost: t.String,

             });
            } else {
              tempType = t.struct({
               name: t.String,
               desc: t.String,
               date: t.Date,
               venue: t.String,
               address: t.String,
               region: Region,
               admission: Admission,
              });
            }

            this.setState({ value : this.state.value, type: tempType, countries: this.state.countries});


        })
        .catch((error) => {
            console.error(error);
        });

    }


    // returns the suitable type based on the form value
      getType(value, countries) {

        const Admission = t.enums({
            F: 'Free',
            NF: '$'
          });
        Region = t.enums(countries);

        console.log('in getType()');

        if (value.admission === 'NF') {
          return t.struct({
           name: t.String,
           desc: t.String,
           date: t.Date,
           venue: t.String,
           address: t.String,
           region: Region,
           admission: Admission,
           cost: t.String
         });
        } else {
          return t.struct({
           name: t.String,
           desc: t.String,
           date: t.Date,
           venue: t.String,
           address: t.String,
           region: Region,
           admission: Admission
          });
        }

      }

//      getInitialState() {
//        const value = {};
//        return { value, type: this.getType(value), countries: {empty: "empty", nonempty: "nonempty"} };
//      }

      onChange(value) {
        // recalculate the type only if strictly necessary
        const type = value.admission !== this.state.value.admission ? this.getType(value, this.state.countries)  : this.state.type;

        console.log("value.admission: " + value.admission);
        console.log("this.state.value.admission: " + this.state.value.admission);
        console.log(value);
        this.setState({ value : value, type: type, countries: this.state.countries});
        console.log(this.state.value)
        console.log(type);
        console.log("countries");
        console.log(this.state.countries);
      }

      onPress() {
        var value = this.refs.form.getValue();
        if (value) {
          console.log(value);
        }
      }

    handleSubmit = () => {
//         do the things
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            // console.log(value); // value here is an instance of Person
            this.push();
            // const {navigate} = this.props.navigation;
            // navigate('Temp');
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Temp'})
              ]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    push = () => {
        const ref = firebase.database().ref('events');
        var k = ref.push().key;
        var val = Math.random().toString();
        var obj = this.refs.form.getValue();
        var updates = {};

        var tempObj = {};
        for(key in obj){
            tempObj[key] = obj[key];
        }
        obj = tempObj;

        obj['date_ms'] = obj.date.getTime();
        obj['createdAt'] = firebase.database.ServerValue.TIMESTAMP;
        obj['uid'] = firebase.auth().currentUser.uid;

        updates[k] = obj;
        console.log(obj);
        ref.update(updates);
        Alert.alert(k + "\n" + val); // this will return you ID
    }

    render() {
        return (
                <ScrollView contentContainerStyle={[styles.scrollview]}>
                   <Form
                        ref="form"
                        type={this.state.type}
                        value={this.state.value}
                        options={options}
                        onChange={this.onChange.bind(this)} />
                    <Button
                        title="Confirm"
                        onPress={this.handleSubmit} />
                </ScrollView>
        );
    }
}

export default NewEventScreen;