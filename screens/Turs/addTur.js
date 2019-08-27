import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { View, StyleSheet, ScrollView } from 'react-native';
import *  as firebase from 'firebase';
import Toast from 'react-native-simple-toast';


export default class addTur extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tur: {
                name: '',
                lastname: '',
                price: '',
                description: '',
                duration: ''
            }
        };
    }
    saveDB() {
        for (let db of this.tourejemplo) {
            let data = {};
            const key = firebase.database().ref().child('turs').push().key;
            data[`turs/${key}`] = db
            firebase.database().ref().update(data).then(() => {
                Toast.showWithGravity('Solicitud enviada con exito', Toast.LONG, Toast.BOTTOM);
                this.props.navigation.navigate('ListTurs');
            });
        }
    }

    render() {
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                        <AppButton
                            bgColor="rgba(255, 38, 74, 0.9)"
                            title="Agregar  "
                            action={this.saveDB()}
                            iconName="plus"
                            iconSize={30}
                            iconColor="#fff"
                        />
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    }
});



