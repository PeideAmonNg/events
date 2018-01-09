import React from 'react';
import {StyleSheet} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;

const styles = StyleSheet.create({
    newEvent: {
//        flex: 1,
//        height: 100,
//        backgroundColor: '#E9E9EF',
         backgroundColor: 'white',
        justifyContent: 'center',
//        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40
    },
    scrollview: {
        alignItems: 'center',
        padding: 40,
        alignItems: 'stretch',
         backgroundColor: 'white',
    },
    container: {
        flex: 1,
//        backgroundColor: '#E9E9EF',
         backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomColor: '#9E9E9E',
        borderBottomWidth: 1
    },
    listItemContainer: {
         flex: 1,
//         height: 80,
         backgroundColor: 'white',
         justifyContent: 'center',
         paddingLeft: 40,
         paddingRight: 40,
         paddingTop: 20,
       },
    border: {
//         borderBottomColor: '#9E9E9E',
        borderBottomColor: "#c7c5c4",
         borderBottomWidth: 1,
         marginTop: 20

    },
    listItem: {
        fontSize: Form.stylesheet.textbox.normal.fontSize,
        color: '#393e42',
//        textAlign: 'center',
    },

    logo: {
        height: 80,
        marginBottom: 16,
        width: 80,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});

export default styles;