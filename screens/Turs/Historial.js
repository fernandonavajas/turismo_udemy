import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import { user } from '../../App'

export default class Historial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historial: [],
            loaded: false,
            tur_logo: require('../../assets/images/primera-alternativa.png')
        };
        
    }

    componentDidMount() {
        
        
        if (user.email == 'hello@celebratechile.com') {
            this.refHistorial = firebase.database().ref().child('registros');
            this.refHistorial.on('value', snapshot => {
                let historial = [];
                snapshot.forEach(row => {
                    historial.push({
                        id: row.key,
                        name: row.val().name,
                        lastname: row.val().lastname,
                        fecha: row.val().fecha,
                        nameUser: row.val().nameUser,
                        phone: row.val().phone,
                        cantidad: row.val().cantidad,
                        idioma: row.val().idioma,
                        privado: row.val().privado,
                        tipoPago: row.val().tipoPago,
                        precio: row.val().precio,
                        comentario: row.val().comentario,
                        conductor: row.val().conductor,
                    })
                });
                historial.sort((a, b) => a.fecha > b.fecha ? -1 : 1)
                this.setState({
                    historial,
                    loaded: true
                });
            })
        }
        else {
            this.refHistorial= firebase.database().ref().child('registros').orderByChild('emailDelRegistro').equalTo(user.email);
            this.refHistorial.on('value', snapshot => {
                let historial = [];
                snapshot.forEach(row => {
                    historial.push({
                        id: row.key,
                        name: row.val().name,
                        lastname: row.val().lastname,
                        fecha: row.val().fecha,
                        nameUser: row.val().nameUser,
                        phone: row.val().phone,
                        cantidad: row.val().cantidad,
                        idioma: row.val().idioma,
                        privado: row.val().privado,
                        tipoPago: row.val().tipoPago,
                        precio: row.val().precio,
                        comentario: row.val().comentario,
                        conductor: row.val().conductor,
                    })
                });
                historial.sort((a, b) => a.fecha > b.fecha ? -1 : 1)
                this.setState({
                    historial,
                    loaded: true
                });
            })
        }

    };

    historialEspecifico(historial) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'HistorialEspecifico',
            params: { historial: historial }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderHistorial(historial) {
        let date = new Date(historial.fecha);
        let mes = new Date(date).getMonth() + 1
        let FormatoFecha = date.getDate() + '/' + mes + '/' + date.getFullYear();

        if (historial.conductor) { // si tiene conductor, sale marcado verde
            if(date<new Date()){//si la salida es menor al dia de hoy, otro color
                return (            // y al precionarlo redirigen a funciones distintas
                    <ListItem
                        containerStyle={styles.item2}
                        titleStyle={styles.title}
                        subtitleStyle={styles.subtitle}
                        roundAvatar
                        title={`${historial.name}  - ${historial.lastname}  `}//(Capacidad:${categoria.name})`}
                        subtitle={`Fecha Salida: ${FormatoFecha} \nNombre: ${historial.nameUser}\nConductor: ${historial.conductor}  `}
                        leftAvatar={{ source: this.state.tur_logo }}
                        onPress={() => this.historialEspecifico(historial)}
                        rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                    />
                )
            }
            return (            // y al precionarlo redirigen a funciones distintas
                <ListItem
                    containerStyle={styles.item}
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    roundAvatar
                    title={`${historial.name}  - ${historial.lastname}  `}//(Capacidad:${categoria.name})`}
                    subtitle={`Fecha Salida: ${FormatoFecha} \nNombre: ${historial.nameUser}\nConductor: ${historial.conductor}  `}
                    leftAvatar={{ source: this.state.tur_logo }}
                    onPress={() => this.historialEspecifico(historial)}
                    rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                />
            )
        }

    }

    render() {
        const { loaded, historial } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (!historial.length) {
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <Text></Text>
                </BackgroundImage>
            )
        }
        if(user.email=='publico@publico.com'){
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <Text></Text>
                </BackgroundImage>
            )
        }
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <FlatList
                    data={historial}
                    renderItem={(data) => this.renderHistorial(data.item)}// cada item en la screen historial
                />
            </BackgroundImage>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'justify',
        fontFamily: "Roboto",
        fontSize: 18,
    },
    subtitle: {
        color: '#fff',

        fontFamily: "Roboto",
        textAlign: 'left'
    },
    listIconStyle: {
        //marginRight: 10,
        fontSize: 40,
        color: 'rgba(255,38,74, 0.1)',

    },
    item: { // aun sin asignar chofer(rojo)
        height: 110,
        margin: 1,
        padding: 8,
        backgroundColor: 'rgba(63, 191, 127, 0.9)'
    },
    item2: { // aun sin asignar chofer(rojo)
        height: 110,
        margin: 1,
        padding: 8,
        backgroundColor: 'rgba(45, 130, 91, 0.9)'
    }
});

