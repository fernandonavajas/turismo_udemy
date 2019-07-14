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
            categorias: [],
            loaded: false,
            tur_logo: require('../../assets/images/robot-prod.png')
        };
        this.refTurs = firebase.database().ref().child('turs')
    }

    componentDidMount() {
        this.refTurs.on('value', snapshot => {
            let turs = [];
            let categorias = [];
            snapshot.forEach(row => {
                turs.push({
                    id: row.key,
                    name: row.val().name,
                    lastname: row.val().lastname,
                    price: row.val().price,
                    description: row.val().description,
                    duration: row.val().duration
                })
            });
            categorias = [... new Set(turs.map(x => x.name))]; // categorias distintas
            this.setState({
                turs,
                categorias,
                loaded: true
            });
        })
    };

    addTur() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddTur'
        });
        this.props.navigation.dispatch(navigateAction);

    }

    tursDetail(categoria) {
        let turFilter = []
        this.state.turs.forEach(row => {
            if (row.name == categoria) {
                turFilter.push({
                    id: row.key,
                    name: row.name,
                    lastname: row.lastname,
                    price: row.price,
                    description: row.description,
                    duration: row.duration
                })
            }
        });
        console.log(turFilter);
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailTur',
            params: { tur: tur }
        });
        this.props.navigation.dispatch(navigateAction);



    }

    renderTurs(categoria) {
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${categoria} `}//(Capacidad:${tur.capacity})`}
                leftAvatar={{ source: this.state.tur_logo }}
                onPress={() => this.tursDetail(categoria)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        )
    }

    render() {
        const { loaded, turs, categorias } = this.state;

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
                    data={categorias}
                    renderItem={(data) => this.renderTurs(data.item)}
                />
                <TurismoAddButton addTurismo={this.addTur.bind(this)} />
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
        height: 100,
        margin: 5,
        padding: 10,
        backgroundColor: 'rgba(63, 191, 191, 0.3)'
    }
});

