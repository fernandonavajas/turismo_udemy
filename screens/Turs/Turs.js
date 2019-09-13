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
            tur_logo: require('../../assets/images/primera-alternativa.png')
        };
        this.refTurs = firebase.database().ref().child('turs')
        this.refRegistros = firebase.database().ref().child('registros')
    }
    componentDidMount() {
        console.log(user.email);
        if (user.email == 'hello@celebratechile.com') {
            this.refRegistros.on('value', snapshot => {
                let registros = [];
                snapshot.forEach(row => {
                    registros.push({
                        id: row.key,
                        name: row.val().name,
                        lastname: row.val().lastname,
                        precio: row.val().precio,
                        privado: row.val().private,
                        comentario: row.val().comentario,
                        cantidad: row.val().cantidad,
                        conductor: row.val().conductor,
                        fecha: row.val().fecha,
                        idioma: row.val().idioma,
                        nameUser: row.val().nameUser,
                        tipoPago: row.val().tipoPago,
                        phone: row.val().phone,
                        email: row.val().emailDelRegistro,

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
            let turs1 = [];
            let categorias = [];
            snapshot.forEach(row => {
                turs1.push({
                    id: row.key,
                    name: row.val().name,
                    lastname: row.val().lastname,
                    price: row.val().price,
                    description: row.val().description,
                    duration: row.val().duration,
                    url: row.val().url,
                    cantidad: row.val().cantidad,
                    privado: row.val().private,
                    email: row.val().email


                })
            });
            //aqui se filtraran los tours correspondientes a los hoteles
            let turs = [];
            let es_hotel = false;
            for (let tur of turs1) {
                if (tur.email == user.email) {
                    es_hotel = true;
                    turs = turs1.filter(a => a.email == user.email)
                }
            }
            if (es_hotel == false) {
                turs = turs1.filter(b => b.email == 'publico')
            }
            categorias = [... new Set(turs.map(x => x.name))]; // categorias distintas
            categoriasExport = categorias;
            tursExport = turs;
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
            routeName: 'RegistroEspecifico',
            params: { registro: registro }
        });
        this.props.navigation.dispatch(navigateAction);
    }
    listarTursEspecificos(categoria) {
        //aqui se debera filtar los tours para que solo salga 1 por nombre del tour
        let turFilter = []
        let lastnames = Array.from(new Set(this.state.turs.map(a => a.lastname)))
            .map(ln => this.state.turs.find(a => a.lastname === ln))//"los andes","viña causiño",...

        lastnames.forEach(row => {
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
        const navigateAction = NavigationActions.navigate({
            routeName: 'TurEspecifico',
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
                title={`${categoria} `}
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
        if (!registro.conductor) {
            return (
                <ListItem
                    containerStyle={styles.item}
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    roundAvatar
                    title={`${registro.name}  - ${registro.lastname}  `}//(Capacidad:${categoria.name})`}
                    subtitle={`Fecha Salida: ${registro.fecha}\nNombre: ${registro.nameUser}\nTeléfono: ${registro.phone}  `}
                    leftAvatar={{ source: this.state.tur_logo }}
                    onPress={() => this.registroEspecifico(registro)}
                    rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                />
            )
        }

    }

    render() {
        const { loaded, turs, categorias, registros } = this.state;

        if (!loaded) {
            return <PreLoader />
        };
        if (user.email == 'hello@celebratechile.com') {
            if (!loaded) {
                return <PreLoader />
            }
            else {
                return (
                    <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                        <FlatList
                            data={registros}
                            renderItem={(data) => this.renderRegistros(data.item)}
                        />
                    </BackgroundImage>
                )
            }
        }
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>

                <FlatList
                    data={categorias}
                    renderItem={(data) => this.renderTurs(data.item)}
                />
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
        padding: 8,
        backgroundColor: 'rgba(212,31,31,0.6)'
    }
});

