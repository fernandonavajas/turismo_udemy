import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text, Card } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';


export default class RegistroEspecifico extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            registroEspecifico: params.registro
        };
    }
    
    render() {
        const { registroEspecifico } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <Card>
                    <Text>{registroEspecifico.nameUser}</Text>
                    <Text>{registroEspecifico.name}</Text>
                    <Text>{registroEspecifico.lastname}</Text>
                </Card>
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'center'
    },
    listIconStyle: {
        //marginRight: 10,
        fontSize: 40,
        color: 'rgba(255,38,74, 0.6)',

    },
    item: {
        height: 200,
        margin: 5,
        padding: 10,
        backgroundColor: 'rgba(21, 0, 255, 0.3)'
    },
    item2: {
        height: 200,
        margin: 5,
        padding: 10,
        backgroundColor: 'rgba(255, 34, 0, 0.3)'
    }
});

