
import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text, Card, Button, Icon } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import AppButton from '../../components/AppButton';


export default class HistorialEspecifico extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            historialEspecifico: params.historial
        };
    }
    goHistorial(){
        const navigateAction = NavigationActions.navigate({
			routeName: 'HistorialScreen',
		});
		this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { historialEspecifico } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <Card style={{ backgroundColor: "grey" }}
                    roundAvatar
                    title={historialEspecifico.name + ": " + historialEspecifico.lastname}
                >
                    <Text style={styles.textTitle}>Datos Cliente</Text>
                    <Text style={styles.textSimple}>Cliente:  {historialEspecifico.nameUser}</Text>
                    <Text style={styles.textSimple}>Teléfono: {historialEspecifico.phone}</Text>
                    <Text>  </Text>
                    <Text style={styles.textTitle}>Datos Tour</Text>
                    <Text style={styles.textSimple}>Cantidad:  {historialEspecifico.cantidad}</Text>
                    <Text style={styles.textSimple}>Fecha de Salida:  {historialEspecifico.fecha}</Text>
                    <Text style={styles.textSimple}>Idioma:  {historialEspecifico.idioma}</Text>
                    <Text style={styles.textSimple}>Privado:  {historialEspecifico.privado ? "privado" : "compartido"}</Text>
                    <Text style={styles.textSimple}>Conductor:  {historialEspecifico.conductor}</Text>
                    <Text style={styles.textSimple}>Comentario: {historialEspecifico.comentario}</Text>
                    <Text style={styles.textSimple}>Tipo Pago:  {historialEspecifico.tipoPago}</Text>
                    <Text style={styles.labelPrecio}>Precio: $ {historialEspecifico.precio}</Text>

                    <AppButton

                        bgColor="grey"
                        title="Volver "
                        iconName="arrow-left"
                        iconColor="#fff"
                        action={() => this.goHistorial()}
                    />

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
    textTitle: {
        fontFamily: 'Roboto',
        borderRadius: 2,
        backgroundColor: 'rgba(223,62,62,1)',
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    textSimple: {
        marginLeft:20,
        fontFamily: 'Roboto',
        borderRadius: 2,
        fontSize: 20,

    },
    labelPrecio: {
        fontFamily: 'Roboto',
        borderRadius: 2,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: 'orange'
    },
    item: {
        height: 100,
        margin: 5,
        padding: 10,
        backgroundColor: 'rgba(63, 191, 191, 0.3)'
    }
});

