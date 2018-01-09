import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';


const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 60
    },
    labelStyle: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
        height: 65,
        flexDirection: 'column',
         alignItems: 'stretch',
         width: '100%',
        marginBottom: 10

    }
};

export default TitledInput;