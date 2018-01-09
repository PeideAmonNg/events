import React from 'react';
import { Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import firebase from 'react-native-firebase';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;


import Item from 'item/Item'

import styles from 'AwesomeProject/styles';
import options from 'AwesomeProject/formOptions';


const list = ['Loading...'];

class MyEventsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'My Events',
        headerRight:

        <View style={{flexDirection: 'row'}}>
            <Button
                title="All"
                onPress={() => navigation.navigate('Home')  }
                style={{margin: 5}}
            />
            <View style={{width: 3}}/>
            <Button
                title="New"
                onPress={() => navigation.navigate('NewEvent')}
            />
            <View style={{width: 3}}/>
            {firebase.auth().currentUser != null && <Button title="log out" onPress ={() => navigation.state.params.logOut()}/>}
        </View>,


        headerStyle: { paddingRight: 5 }

    })

    logOut(){
        firebase.auth().signOut().then(() => {
            Alert.alert("logged out");
            this.props.navigation.navigate("Login");
        })
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {
            dataSource: this.ds.cloneWithRows(list)
        };

        this.itemsRef = this.getRef();
        this.renderItem = this.renderItem.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    getRef() {
        return firebase.database().ref('events').orderByChild('uid').equalTo(firebase.auth().currentUser.uid);
    }

    setItemsFromFirebase(itemsRef) {
        itemsRef.on('value', (snap) => {
            console.log("on code called");
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var item = {};
                item['name'] = child.val().name;
                item['date'] = child.val().date;
                item['key'] = child.key;
                item['msg'] = this.msg;
                items.push(item);
            });

            this.setState({
                dataSource: this.ds.cloneWithRows(items.reverse())
            });
        });
    }

    msg(){
        console.log("msg is called");
        this.props.navigation.navigate('Home');
        ToastAndroid.show(" was deleted", ToastAndroid.SHORT);
    }

    componentDidMount() {
        this.setItemsFromFirebase(this.itemsRef);
    }

    componentWillMount(){
        this.props.navigation.setParams({ logOut: this.logOut });
    }

    renderItem(item) {
        return (
            <Item item={item} nav={this.props.navigation} />
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem} />
            </View>
        )
    }
}

export default MyEventsScreen;