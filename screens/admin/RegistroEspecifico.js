import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import { StyleSheet, ScrollView, View, Clipboard } from 'react-native';
import { Text, Card, Input, Button, Icon } from "react-native-elements";
import *  as firebase from 'firebase'
import AppButton from '../../components/AppButton';
import Toast from 'react-native-simple-toast';

export default class RegistroEspecifico extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            conductor: '',
            registroEspecifico: params.registro
        };
    }
    save(usuario) {
        if (this.state.conductor) {
            const fb = firebase.database().ref()
            key = usuario.id;
            fb.child('registros/' + key).update({ 'conductor': this.state.conductor }).then(() => {
                Toast.showWithGravity('Conductor asignado con exito', Toast.LONG, Toast.BOTTOM);
                this.props.navigation.navigate('ListTurs');
            })
        }
    }

    noMostrarConductor = <View>
        <Input
            onChangeText={(text => this.setState({ conductor: text }))}
            placeholder='¿Quien será el conductor?'
            label='Conductor'
            labelStyle={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: 20 }}
        />
        <Text> </Text>
        <AppButton
            bgColor="rgba(63, 191, 127, 1)"
            title="Registrar conductor  "
            action={() => this.save(this.state.registroEspecifico)}
            iconName="car"
            iconColor="#fff"
        >{{}} </AppButton>
    </View>
    mostrarConductor = <Text style={styles.textSimple}>Conductor: alejandro</Text>
    render() {
        const { registroEspecifico } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <ScrollView>

                    <Card>
                        <View style={{ borderRadius: 100, backgroundColor: 'rgba(223,62,62,0.95)', }}>
                            <Text style={styles.textTitle}>{registroEspecifico.name}</Text>
                            <Text style={styles.textTitle}>{registroEspecifico.lastname}</Text>
                        </View>
                        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Fecha salida: {registroEspecifico.fecha}</Text>
                        <Text style={styles.textSimple}>Nombre: {registroEspecifico.nameUser}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textSimple}>Teléfono: {registroEspecifico.phone}   </Text>
                            <Icon  name='clipboard' type='font-awesome' size={25}
                                color='rgba(223,62,62,1)' onPress={async () => {
                                    await Clipboard.setString(registroEspecifico.phone)
                                    Toast.showWithGravity('Copiado!', Toast.LONG, Toast.BOTTOM)
                                }} />

                        </View>
                        <Text style={styles.textSimple}>Idioma: {registroEspecifico.idioma}</Text>
                        <Text style={styles.textSimple}>Pasajeros: {registroEspecifico.cantidad}</Text>
                        <Text style={styles.textSimple}>{registroEspecifico.privado ? 'Privado' : 'Compartido'}</Text>
                        <Text style={styles.textSimple}>Precio: $ {registroEspecifico.precio}</Text>
                        <Text style={styles.textSimple}>Tipo pago: {registroEspecifico.tipoPago}</Text>
                        <Text style={styles.textComment}>{`Comentarios: ${registroEspecifico.comentario}`}</Text>
                        <Text>  </Text>
                        <View style={{ borderTopWidth: 3, borderRadius: 10, borderColor: 'rgba(223,62,62,0.95)' }}>
                            {registroEspecifico.conductor ? this.mostrarConductor : this.noMostrarConductor}
                            <Text> </Text>
                        </View>
                    </Card>
                </ScrollView>
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
    textComment: {
        paddingBottom: 3,
        marginLeft: 10,
        fontFamily: 'Roboto',
        fontSize: 18,
        color: '#d0d2d3'
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

