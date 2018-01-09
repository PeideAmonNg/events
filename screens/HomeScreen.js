import React from 'react';
import { BackHandler, Dimensions, Spacer, ToastAndroid, ListItem, ListView, Button, StyleSheet, Platform, Image, Text, View, Alert, TextInput, ScrollView, TouchableHighlight } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';


import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import firebase from 'react-native-firebase';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;


import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
 

import { NavigationActions } from 'react-navigation'    

import Item from 'item/Item'

import styles from 'reactnativenav/styles';
import options from 'reactnativenav/formOptions';


const list = ['Loading...'];




class HomeScreen extends React.Component {

static navigationOptions = ({navigation}) => ({
        title: navigation.state.params && navigation.state.params.name
      });


    logOut(){ 
        firebase.auth().signOut().then(() => {
            Alert.alert("logged out");
            this.props.navigation.navigate("Login");
        })
    }

    constructor(props) {
        super(props);
        console.log("in homescreen");
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {
            dataSource: this.ds.cloneWithRows(list),
            dataSource2: this.ds.cloneWithRows(list),
            index: 0,
            routes: [
              { key: 'first', title: 'All Events' },
              { key: 'second', title: 'My Events' },
            ],
        };

        this.itemsRef = this.getRef();
        this.renderItem = this.renderItem.bind(this);
        this.logOut = this.logOut.bind(this);

        this.props.navigation.setParams({name: "Events"})

    }

    getRef() {
        return firebase.database().ref('events');
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

            var tempState = {};
            for(var key in this.state){
                tempState[key] = this.state[key];
            }

            let tempRows = this.ds.cloneWithRows(items.reverse());
            delete tempState['dataSource'];
            tempState['dataSource'] = tempRows;

            this.setState(tempState);

            console.log("printing state from setItemsFromFirebase:");
            console.log(this.state);
        });

        firebase.database().ref('events').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', (snap) => {
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

            var tempState = {};
            for(var key in this.state){
                tempState[key] = this.state[key];
            }

            let tempRows = this.ds.cloneWithRows(items.reverse());
            tempState['dataSource2'] = tempRows;

            this.setState(tempState);

            console.log("printing state from setItemsFromFirebase:");
            console.log(this.state);
        });
    }

    msg(){
        console.log("msg is called");
        this.props.navigation.navigate('Home');
        ToastAndroid.show(" was deleted", ToastAndroid.SHORT);
    }

    componentDidMount() {
        this.setItemsFromFirebase(this.itemsRef);

        // BackHandler.addEventListener('hardwareBackPress', () =>{
        //   // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        //   // Typically you would use the navigator here to go to the last state.

        //     const resetAction = NavigationActions.reset({
        //       index: 0,
        //       actions: [
        //         NavigationActions.navigate({ routeName: 'Home'})
        //       ]
        //     })
        //     this.props.navigation.dispatch(resetAction)

        //   return false;
        // });

        this.props.navigation.setParams({ logOut: this.logOut });
    }

    renderItem(item) {
        return (
            <Item item={item} nav={this.props.navigation} />
        )
    }

    render() {
        var vuwColor = "#115737";
        return(
            <View style={{flex: 1}}>
            <ScrollableTabView style={ {backgroundColor: "white"} }  tabBarActiveTextColor = {vuwColor} tabBarUnderlineStyle={{backgroundColor: vuwColor}} renderTabBar={() => <DefaultTabBar containerWidth = {Dimensions.get('window').width } />} >
                <ListView tabLabel="All Events"
                dataSource={this.state.dataSource}
                renderRow={this.renderItem} removeClippedSubviews={false}  />
                <ListView tabLabel="My Events"
                dataSource={this.state.dataSource2}
                renderRow={this.renderItem} removeClippedSubviews={false}  />
            </ScrollableTabView>
            <ActionButton buttonColor="orange">
              <ActionButton.Item buttonColor='#9b59b6' title="New Event" onPress={() => {this.props.navigation.navigate("NewEvent")}}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
            </View>
             
        )
    }
}


export default HomeScreen;