import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import firebase from 'react-native-firebase';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;

import styles from 'reactnativenav/styles';

import options from 'reactnativenav/formOptions';

import { NavigationActions } from 'react-navigation';

class EditEventScreen extends React.Component {
    static navigationOptions = {
        title: 'Edit Event',
    };

    constructor(props){
       super(props);

       var value = {};
       var countries = {"loading": "Loading..."};
       this.state = { value, type: this.getType(value, countries), countries };

        var ref = firebase.database().ref('events').child(this.props.navigation.state.params.key);
        ref.once('value', (snap) => {
            console.log("snapped");
            console.log(snap.val());
            var s = snap.val();
            console.log(s);
            console.log(typeof(s));
            var value = {};
            value.name = s.name;
            value.desc = s.desc;
            value.date = new Date(s.date);
            value.venue = s.venue;
            value.address = s.address;
            value.region = s.region;
            value.admission = s.admission;

            if("cost" in s){
                value.cost = s.cost;
            }


            this.setState({value, type: this.getType(value, this.state.countries), countries: this.state.countries});
        });

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

            tempVal = this.state.value;
//            tempVal['region'] = "NZ";
            this.setState({ value : tempVal, type: tempType, countries: countries});


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
        console.log(value.admission == '$');


        console.log("exiting getType");

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
           admission: Admission,
          });
        }


      }

//      getInitialState() {
//        const value = {};
//        return { value, type: this.getType(value) };
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
      }

      onPress() {
        var value = this.refs.form.getValue();
        if (value) {
          console.log(value);
        }
      }

    handleSubmit = () => {
        // do the things
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            // console.log(value); // value here is an instance of Person
            this.push();
            // const {navigate} = this.props.navigation;
            // navigate('Home');

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
        var obj = this.refs.form.getValue();

        var ref = firebase.database().ref('events').child(this.props.navigation.state.params.key);
            ref.once('value', (snap) => {
//                    this.setState({name: snap.val().name});

//            var s = snap.val();
////                s['key'] = snap.key;
//            var obj = {key: snap.key};
//            var copy = Object.assign(obj, s);
//            copy.date_date = copy.date;
//            copy.date = moment(copy.date).format("hh:mm a");
//            this.setState(copy);
//
//            this.props.navigation.setParams({
//                name: copy.name,
//            });


            var val = Math.random().toString();

            var updates = {};

            var tempObj = {};
            for(key in obj){
                tempObj[key] = obj[key];
            }
            obj = tempObj;

            console.log("printing obj");
            console.log(obj);
            console.log("ending obj");

            obj['date_ms'] = obj.date.getTime();
            obj['createdAt'] = snap.val().createdAt;
            obj['uid'] = firebase.auth().currentUser.uid;
            obj['updatedAt'] = firebase.database.ServerValue.TIMESTAMP;

            updates[this.props.navigation.state.params.key] = obj;
//            console.log(obj);
             firebase.database().ref('events').update(updates);
//            ref.update(obj);
            Alert.alert(this.props.navigation.state.params.key + "\n" + val); // this will return you ID
         });


    }

    render() {
        return (
                <ScrollView contentContainerStyle={[styles.scrollview]}>
                    <Image source={require('reactnativenav/assets/RNFirebase512x512.png')} style={[styles.logo]} />
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

export default EditEventScreen;