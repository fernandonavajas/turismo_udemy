import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text, Card, Input, Button } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import AppButton from '../../components/AppButton';


export default class RegistroEspecifico extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            registroEspecifico: params.registro
        };
    }
    save(conductor){
        console.log(conductor)
    }
    

    render() {
        const { registroEspecifico } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <Card>
                    <Text style={styles.textTitle}>{registroEspecifico.name}</Text>
                    <Text style={styles.textTitle}>{registroEspecifico.lastname}</Text>
                    <Text style={{ textAlign: 'center' }}>Fecha salida: {registroEspecifico.fecha}</Text>
                    <Text> </Text>
                    <Text style={styles.textSimple}>Nombre: {registroEspecifico.nameUser}</Text>
                    <Text style={styles.textSimple}>Teléfono: {registroEspecifico.phone}</Text>
                    <Text style={styles.textSimple}>Idioma: {registroEspecifico.idioma}</Text>
                    <Text style={styles.textSimple}>Pasajeros: {registroEspecifico.cantidad}</Text>
                    <Text style={styles.textSimple}>Precio: $ {registroEspecifico.precio}</Text>
                    <Text style={styles.textSimple}>Tipo pago: {registroEspecifico.tipoPago}</Text>
                    <Text style={styles.textSimple}>Comentarios: {registroEspecifico.comentario}</Text>
                    <Text>  </Text>
                    <Input 
                        style={{marginBottom:50}}
                        placeholder='¿Quien será el conductor?'
                        label='Conductor'
                        labelStyle={styles.textSimple}
                    />
                    <Text> </Text>
                    <AppButton
                        bgColor="green"
                        title="Registrar conductor "
                        action={()=>this.save.bind(this)}
                        iconName="car"
                        iconColor="#fff"
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
        paddingBottom: 3,
        marginLeft: 10,
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

