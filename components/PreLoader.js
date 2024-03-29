import React, { Component } from 'react';
import  { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default class PreLoader extends Component {
    render() { 
        return ( 
            <View style={[styles.preloader]}>
                <ActivityIndicator style={{height:80}} size="large"/>
            </View>
         );
    }
}
 
const styles =StyleSheet.create({
    preloader:{
        flex: 1,
        flexDirection: 'column',//tanto espacio como pueda en vertical
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#242935'
    }
})