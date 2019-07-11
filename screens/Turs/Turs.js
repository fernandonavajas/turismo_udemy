import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import TurismoAddButton from '../../components/Turismo/TurismoAddButton';

export default class Turs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turs: [],
            loaded: false,
            tur_logo: require('../../assets/images/robot-prod.png')
        };
        this.refTurs = firebase.database().ref().child('turs')
    }

    componentDidMount() {
        this.refTurs.on('value', snapshot => {
            let turs = [];
            snapshot.forEach(row => {
                turs.push({
                    id: row.key,
                    name: row.val().name,
                    address: row.val().address,
                    capacity: row.val().capacity,
                    description: row.val().description
                })
            });
            this.setState({
                turs,
                loaded: true
            });
        })
    };

    addTur() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'addTurs'
        });
        this.props.navigation.dispatch(navigateAction);

    }

    tursDetail(tur) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailTur',
            params: {tur: tur}
        });
        this.props.navigation.dispatch(navigateAction);


    }

    renderTurs(tur) {
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${tur.name} (Capacidad:${tur.capacity})`}
                leftAvatar={{ source: this.state.tur_logo }}
                onPress={() => this.tursDetail(tur)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        )
    }

    render() {
        const { loaded, turs } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (!turs.length) {
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <Text>no hay turs disponibles</Text>
                    <TurismoAddButton addTurismo={this.addTur.bind(this)} />
                </BackgroundImage>
            )
        }
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <FlatList
                    data={turs}
                    renderItem={(data) => this.renderTurs(data.item)}
                />
                <TurismoAddButton addTurismo={this.addTur.bind(this)} />
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
        fontSize: 40,
        color: 'rgba(255,38,74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    }
});

