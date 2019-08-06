import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Text } from "react-native-elements";
import *  as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';
import TurismoAddButton from '../../components/Turismo/TurismoAddButton';
import { user } from '../../App'

export var categoriasExport = [];
export var tursExport = [];
export default class Turs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turs: [],
            categorias: [],
            registros: [],
            loaded: false,
            tur_logo: require('../../assets/images/robot-prod.png')
        };
        this.refTurs = firebase.database().ref().child('turs')
        this.refRegistros = firebase.database().ref().child('registros')
        //console.log(user.email);
    }
    componentDidMount() {

        if (user.email == 'fernando.navajaso@utem.cl') {
            this.refRegistros.on('value', snapshot => {
                let registros = [];
                snapshot.forEach(row => {
                    registros.push({
                        id: row.key,
                        name: row.val().name,
                        lastname: row.val().lastname,
                        precio: row.val().precio,
                        cometario: row.val().comentario,
                        cantidad: row.val().cantidad,
                        conductor: row.val().conductor,
                        fecha: row.val().fecha,
                        idioma: row.val().idioma,
                        nameUser: row.val().nameUser,
                        tipoPago: row.val().tipoPago,
                        phone: row.val().phone,
                        color: row.val().color

                    })
                });
                registros.sort((a, b) => a.fecha > b.fecha ? -1 : 1)
                this.setState({
                    registros,
                    loaded: true
                });
            })
        }
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
                    duration: row.val().duration,
                    url: row.val().url
                })
            });
            categorias = [... new Set(turs.map(x => x.name))]; // categorias distintas
            categoriasExport=categorias;
            tursExport=turs;
            this.setState({
                turs,
                categorias,
                loaded: true
            });
        });

    };

    addTur() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddTur'
        });
        this.props.navigation.dispatch(navigateAction);

    }
    registroEspecifico(registro) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'RegistroEspecifico',//DetailTur
            params: { registro: registro }
        });
        this.props.navigation.dispatch(navigateAction);
    }
    listarTursEspecificos(categoria) {
        let turFilter = []
        this.state.turs.forEach(row => {
            if (row.name == categoria) {
                turFilter.push({
                    id: row.key,
                    name: row.name,
                    lastname: row.lastname,
                    price: row.price,
                    description: row.description,
                    duration: row.duration,
                    url: row.url
                })
            }
        });
        //console.log(turFilter); // esto muestra el json con los turs especificos
        const navigateAction = NavigationActions.navigate({
            routeName: 'TurEspecifico',//DetailTur
            params: { turFilter: turFilter }
        });
        this.props.navigation.dispatch(navigateAction);

    }

    renderTurs(categoria) {
        return (
            <ListItem
                containerStyle={styles.item}
                titleStyle={styles.title}
                roundAvatar
                title={`${categoria} `}//(Capacidad:${categoria.name})`}
                leftAvatar={{ source: this.state.tur_logo }}
                onPress={() => this.listarTursEspecificos(categoria)}
                rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            />
        )
    }
    renderRegistros(registro) {
        var date = new Date(registro.fecha);
            var FormatoFecha = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
            registro.fecha = FormatoFecha;
            if (registro.conductor) { 
                return (
                    <ListItem
                        containerStyle={styles.item2}
                        titleStyle={styles.title}
                        subtitleStyle={styles.subtitle}
                        roundAvatar
                        title={`${registro.name} - ${registro.lastname} `}//(Capacidad:${categoria.name})`}
                        subtitle={`Fecha Salida: ${registro.fecha} \n Nombre:${registro.nameUser} \n Teléfono: ${registro.phone}  `}
                        leftAvatar={{ source: this.state.tur_logo }}
                        onPress={() => this.registroEspecifico(registro)}
                        rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                    />
                )
            }
            return (
                <ListItem
                    containerStyle={styles.item}
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    roundAvatar
                    title={`${registro.name}  - ${registro.lastname}  `}//(Capacidad:${categoria.name})`}
                    subtitle={`Teléfono: ${registro.phone} \n Fecha Salida: ${registro.fecha}`}
                    leftAvatar={{ source: this.state.tur_logo }}
                    onPress={() => this.registroEspecifico(registro)}
                    rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                />
            )
        
    }

    render() {
        const { loaded, turs, categorias, registros } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (!turs.length) {
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <Text>no hay turs disponibles</Text>
                </BackgroundImage>
            )
        }
        if (user.email == 'fernando.navajaso@utem.cl') {
            
            return (
                <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                    <FlatList
                        data={registros}
                        renderItem={(data) => this.renderRegistros(data.item)}
                    />

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
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#fff',
        textAlign: 'left'
    },
    subtitle: {
        color: '#fff',
        fontFamily: 'Roboto',
        textAlign: 'left'
    },
    listIconStyle: {
        //marginRight: 10,
        fontSize: 40,
        color: 'rgba(255,38,74, 0.6)',

    },
    item: {
        height: 100,
        margin: 1,
        padding: 10,
        backgroundColor: 'rgba(191, 63, 63, 0.5)'
    },
    item2: { // Chofer asignado(verde)
        height: 100,
        margin: 1,
        backgroundColor: 'rgba(63, 191, 127, 0.5)'
    }
});

