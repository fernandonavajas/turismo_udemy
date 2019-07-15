import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';


export default class Historial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historial: [],
            loaded: false,
            tur_logo: require('../../assets/images/robot-prod.png')
        };
        this.refHistorial = firebase.database().ref().child('registros')
    }

    componentDidMount() {
        this.refHistorial.on('value', snapshot => {
            let historial = [];
            snapshot.forEach(row => {
                historial.push({
                    id: row.key,
                    categoria: row.val().categoria,
                    lugar: row.val().lugar,
                    fecha: row.val().fecha,
                    name: row.val().name,
                    phone: row.val().phone,
                    cantidad: row.val().cantidad,
                    idioma: row.val().idioma,
                    privado: row.val().privado,
                    tipoPago: row.val().tipoPago,
                    precio: row.val().precio,
                    comentario: row.val().comentario,
                    conductor: row.val().conductor,
                    color: row.val().color,
                })
            });
            historial.sort((a,b)=>a.fecha>b.fecha ? -1: 1)
            this.setState({
                historial,
                loaded: true
            });
        })
    };

    historialEspecifico(historial) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'TurEspecifico',//DetailTur
            params: { historial: historial }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderHistorial(historial) {
        if (historial.color) {
            return (
                <ListItem
                    containerStyle={styles.item2}
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    title={`${historial.categoria}( ${historial.lugar}) `}//(Capacidad:${tur.capacity})`}
                    subtitle={`${historial.fecha} `}
                    onPress={() => this.historialEspecifico(historial)}
                    rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                />
            )
        }
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                title={`${historial.categoria} ( ${historial.lugar} ) `}//(Capacidad:${tur.capacity})`}
                subtitle={`${historial.fecha} `}
                onPress={() => this.historialEspecifico(historial)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        )
    }

    render() {
        const { loaded, historial } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (!historial.length) {
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <Text>No existe historial</Text>
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
        textAlign: 'center'
    },
    subtitle: {
        color: '#fff',
        textAlign: 'center'
    },
    listIconStyle: {
        //marginRight: 10,
        fontSize: 40,
        color: 'rgba(255,38,74, 0.6)',

    },
    item: { // aun no listo
        height: 150,
        margin: 3,
        padding: 10,
        backgroundColor: 'rgba(191, 63, 63, 0.6)'
    },
    item2: { // listo
        height: 130,
        margin: 3,
        padding: 10,
        backgroundColor: 'rgba(63, 191, 127, 0.6)'
    }
});

