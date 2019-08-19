import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';


export default class TurEspecifico extends Component {
    constructor(props) {
        super(props);
        const {params}= props.navigation.state;
        this.state = {
            turEspecifico: params.turFilter,
            tur_logo: require('../../assets/images/primera-alternativa.png')
        };
    }

    turEspecificoDetail(turEspecifico) {
        //console.log(turEspecifico);
        const navigateAction = NavigationActions.navigate({
            routeName: 'DetailTur',
            params: { tur: turEspecifico}
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderTurs(turEspecifico) {
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${turEspecifico.lastname} `}//(Capacidad:${tur.capacity})`}
                leftAvatar={{ source: this.state.tur_logo }}
                onPress={() => this.turEspecificoDetail(turEspecifico)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        )
    }

    render() {
        const { turEspecifico, turs } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <FlatList
                    data={turEspecifico}
                    renderItem={(data) => this.renderTurs(data.item, turs)}
                />
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
        height: 90,
        margin: 1,
        padding: 8,
        backgroundColor: 'rgba(63, 191, 191, 0.3)'
    }
});

