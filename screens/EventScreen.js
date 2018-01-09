import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import moment from 'moment';
import firebase from 'react-native-firebase';

import { Icon } from 'react-native-elements'


import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;

import styles from 'reactnativenav/styles';

import options from 'reactnativenav/formOptions';

import { NavigationActions } from 'react-navigation';

let myFormatFunction = (format, date) =>{
    return moment(date).format(format);
}


class EventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Event',
    headerTintColor: 'white',
    
        headerRight:
        <View style={{flexDirection: 'row', paddingRight: 10, alignItems: "center"}}>

        <Icon  
              name='pencil'
              type='material-community'
              color='white'
              onPress={() => navigation.navigate('EditEvent', {key: navigation.state.params.key}) }
            />
            <View style={{width: 15}}/>
            <Icon 
              name='delete'
              type='material-community' 
              color='red'
              onPress={() => (
                        Alert.alert(
                'Delete Event', 
                'Are you sure?',
                [
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => firebase.database().ref('events').child(navigation.state.params.key)
                         .remove((e) => {
                            console.log(e);
                             const resetAction = NavigationActions.reset({
                              index: 0,
                              actions: [
                                NavigationActions.navigate({ routeName: 'Temp'})
                              ]
                            })
                            navigation.dispatch(resetAction)

                             ToastAndroid.show(navigation.state.params.name + " was deleted", ToastAndroid.SHORT);
                         })
                     }
                ],
                { cancelable: true }
                    )
                ) }
                style={{ color: "red", fontWeight: "bold"}}
            />
            
        </View>

    })

    constructor(props) {
        super(props);
        this.state = {
            name: "loading.."
        };
        var ref = firebase.database().ref('events').child(this.props.navigation.state.params.key);
            ref.on('value', (snap) => {
            console.log("snapped");
            console.log(snap.val());
//                    this.setState({name: snap.val().name});
            var s = snap.val();
//                s['key'] = snap.key;
            var obj = {key: snap.key};
            var copy = Object.assign(obj, s);
//            copy.date_date = copy.date;
//            copy.date = moment(copy.date).format("hh:mm a");
            this.setState(copy);

            this.props.navigation.setParams({
                name: copy.name,
            });
         });


      }

      onPress(){



      }

    handleSubmit = () => {
        // do the things
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            // console.log(value); // value here is an instance of Person
            this.push();
            const {navigate} = this.props.navigation;
            navigate('Home');
        }

        // {Object.keys(this.state).map(pair => ( 
        //             pair && pair != 'name' && pair != 'date_ms' && pair != "key" && pair != "uid" && 
        //             <Text key={pair} style={styles.listItem}>
        //                 <Text style={{fontWeight: "bold"}}>{(options.fields[pair] && options.fields[pair].label) || pair}: </Text>
        //                 <Text>{this.state[pair].toString()}</Text>
        //             </Text>
        //         ))}
    }


    render() {
        console.log("Font size: ");
        return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <ScrollView contentContainerStyle={[styles.newEvent, {paddingTop: 20}]}>
                <Text style={[styles.listItem, {fontWeight: 'bold', fontSize: 20}]}>{this.state.name}{"\n\n"}</Text>

                <Text style={[styles.listItem, {marginTop: 5, marginBottom: 5}]}>
                    <Text style={{fontWeight: "bold"}}>When: </Text>
                    <Text>{this.state.date && myFormatFunction("hh:mma on ddd, DD/MM/YYYY", this.state.date)}</Text>
                </Text>

                <Text style={[styles.listItem, {marginTop: 5, marginBottom: 5}]}>
                    <Text style={{fontWeight: "bold"}}>Where: </Text>
                    <Text>{this.state.venue && this.state.venue.toString()}{", at " + this.state.address}</Text>
                </Text>

                <Text style={[styles.listItem, {marginTop: 5, marginBottom: 5}]}>
                    <Text style={{fontWeight: "bold"}}>Admission: </Text>
                    <Text>{this.state.admission == "F" ? "Free" : "$" + this.state.cost}</Text>
                </Text>

                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                  }}
                />

                <Text style={[styles.listItem, {marginTop: 5, marginBottom: 5}]}>
                    <Text>{this.state.desc && this.state.desc.toString()}</Text>
                </Text>

            </ScrollView>
        </View>
        );
    }

}

export default EventScreen;