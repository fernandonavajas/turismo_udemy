import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import SnapshotState from 'jest-snapshot/build/State';

export default class Paseos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paseos: [],
            loaded: false,
            paseo_logo: require('../../assets/images/robot-prod.png')
        };
        this.refPaseos = firebase.database().ref().child('paseos')
    }
    addPaseo() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'addPaseos'
        });
        this.props.navigation.dispatch(navigateAction);

    }

    paseosDetail(paseo) {

    }

    renderPaseos(paseo) {
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${paseo.nombre} (Capacidad:${paseo.capacidad})`}
                avatar={this.state.paseo_logo}
                onPress={() => this.paseosDetail(paseo)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styleMedia.listIconStyle }}
            />
        )
    }
    componentDidMount() {
        this.refPaseos.on('value', snapshop => {
            let Paseos = [];
            SnapshotState.forEach(row => {
                paseos.push({
                    id: row.key,
                    nombre: row.val().nombre,
                    direccion: row.val().direccion,
                    capacidad: row.val().capacidad,
                    description: row.val().descripcion
                })
            })
            this.setState({
                paseos,
                loaded: true
            });
        })
    };
    
    render() {
        const { loaded, paseos } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (!paseos.length) {
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                    <Text>no hay paseos disponibles</Text>
                    <TurismoAddButton addTurismo={this.addPaseo.bind(this)} />
                </BackgroundImage>
            )
        }
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <FlatList
                    data={paseos}
                    renderItem={(data) => this.renderPaseos(data.item)}
                />
                <TurismoAddButton addTurismo={this.addPaseo.bind(this)} />
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255,38,74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    }
});

