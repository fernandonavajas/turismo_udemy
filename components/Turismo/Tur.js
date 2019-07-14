import React, { Component } from 'react';
import AppButton from '../AppButton';
import { StyleSheet, FlatList } from 'react-native';
import { Card, Text } from 'react-native-elements';
import TurRating from './TurRating';


export default class Tur extends Component {
    render() {
        const { goRegistrar, goHome, tur } = this.props;
        return (
            <Card
                title={tur.lastname}
                image={require('../../assets/images/cordilleraLarge.jpeg')}
            >
                <TurRating turId={tur.id} />
                <Text style={{ marginBottom: 15, marginTop: 10 }}>
                    {tur.description}
                </Text>
                <AppButton
                    bgColor="green"
                    title="Solicitar "
                    action={goRegistrar}
                    iconName="map-signs"
                    iconColor="#fff"
                />
                <AppButton
                    bgColor="grey"
                    title="Volver "
                    action={goHome}
                    iconName="arrow-left"
                    iconColor="#fff"
                />

            </Card>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 38, 74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)',
    }
});