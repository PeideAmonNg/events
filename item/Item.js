import React, {Component} from 'react';
import {
    ToastAndroid,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableHighlight
} from 'react-native';

import firebase from 'react-native-firebase';

import { StackNavigator } from 'react-navigation';

import styles from 'reactnativenav/styles';

import moment from 'moment';


class Item extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
  }

  onPress(){
    var key =  this.props.item.key

    var name = this.props.item.name;

    console.log("pressed " + key);

    Alert.alert(
        'Delete Event',
        'Are you sure?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => firebase.database().ref('events').child(key).remove(function(e){console.log(e); ToastAndroid.show(name + " was deleted", ToastAndroid.SHORT); }) }
        ],
        { cancelable: true }
      )
  }

  render() {
        const { navigate } = this.props.nav;
    return (
      <TouchableHighlight  delayLongPress={500} onLongPress={this.onPress} onPress={() => navigate('Event', { key: this.props.item.key })} >
        <View style={styles.listItemContainer}>
          <Text style={[styles.listItem, {fontWeight: 'bold'}]}>{this.props.item.name}</Text>
          <Text style={styles.listItem}>{ moment(this.props.item.date).format("ddd, DD/MM/YY") }</Text>
          <Text style={styles.border}></Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Item;