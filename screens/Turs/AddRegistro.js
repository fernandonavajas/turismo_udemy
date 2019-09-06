import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { View, StyleSheet, ScrollView, Picker, Text, Switch, KeyboardAvoidingView } from 'react-native';
import *  as firebase from 'firebase';
import { options, RegistroUsuario } from '../../forms/delUsuario';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { Card, Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import NumericInput from 'react-native-numeric-input'

//import de usuario para saber el email del usuario
import { user } from '../../App';

//import para listar todas las categorias y subcategorias de cada uno
import { categoriasExport } from './Turs';//todas las categorias
import { tursExport } from './Turs'//todos los tours

export default class AddRegistro extends Component {

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            //array de tours seleecionados
            turFilter: [],
            //picker categoria (name)
            pickerItemArray1: categoriasExport,
            pickerSelection1: params.tur.name,
            //picker subcategoria(lastname)
            pickerItemArray2: [params.tur.lastname],
            pickerSelection2: params.tur.lastname,
            //Formulario de Registro
            registroUsuario: {
                name: params.tur.name,
                lastname: params.tur.lastname,
                cantidad: 2,
                privado: true,
                precio: params.tur.price,
                tipoPago: 'Efectivo',
                nameUser: '',
                phone: '',
                fecha: '',
                idioma: 'Español',
                comentario: '',
                conductor: '',
                emailDelRegistro: user.email,
            },
            loaded: false,
            changed: false,

        }
    }

    componentDidMount() {
        let turFilter = [];
        let pickerItemArray2 = [];
        tursExport.forEach(row => {
            if (row.name == this.state.pickerSelection1) {
                turFilter.push({
                    lastname: row.lastname,
                    precio: row.price,
                    privado: row.privado,
                    email: row.email,
                    cantidad: row.cantidad
                })
                pickerItemArray2.push(row.lastname);//todos los lugares dentro de la categoria
            }
        });
        pickerItemArray2 = [... new Set(pickerItemArray2.map(x => x))];

        this.setState({
            pickerItemArray2,
            turFilter,
            loaded: true
        });//, () => this.calculoPrecio()


    }
    save() {
        const validate = this.refs.form.getValue();
        if (validate) {
            let data = {};
            const key = firebase.database().ref().child('registros').push().key;
            data[`registros/${key}`] = this.state.registroUsuario;
            firebase.database().ref().update(data).then(() => {
                Toast.showWithGravity('Solicitud enviada con exito, lo contactaremos a la brevedad', Toast.LONG, Toast.BOTTOM);
                this.props.navigation.navigate('ListTurs');
            });
        }
    }

    componentDidUpdate() {
        if (!this.state.changed) {
            this.calculoPrecio();
            this.state.changed = true;
        }
    }

    onChange(registroUsuario) {
        this.setState({ registroUsuario });
    }
    actualizarLastname(itemValue) {
        let turFilter = [];
        let pickerItemArray2 = [];
        tursExport.forEach(row => {
            if (row.name == itemValue) {
                turFilter.push({
                    lastname: row.lastname,
                    precio: row.price,
                    privado: row.privado,
                    email: row.email,
                    cantidad: row.cantidad
                })
                pickerItemArray2.push(row.lastname);//todos los lugares dentro de la categoria
            }
        });
        pickerItemArray2 = [... new Set(pickerItemArray2.map(x => x))];

        this.setState({
            pickerItemArray2,
            turFilter
        });

        //añadir los lugares al picker de lugares

    }
    toogleSwitch(valor) {
        this.setState(prevState => ({
            registroUsuario: {
                ...prevState.registroUsuario,
                privado: valor

            }

        }))
    }
    cambiarPrecio(nuevoPrecio) {
        this.setState(prevState => ({
            registroUsuario: {
                ...prevState.registroUsuario,
                precio: nuevoPrecio
            }
        }))

    }
    calculoPrecio() {// variables que influjen en el precio(lugar,cantidad, privado)
        for (let tur of this.state.turFilter) {
            if (tur.lastname == this.state.registroUsuario.lastname &&
                tur.cantidad == this.state.registroUsuario.cantidad &&
                tur.privado == this.state.registroUsuario.privado) {
                this.cambiarPrecio(tur.precio)
            }
        }
        return 0;
    }

    formatoPrecio(precio) {
        let PrecioEnMiles = precio / 1000
        let precioString = PrecioEnMiles + ".000";
        return (precioString);
    }


    render() {
        const { registroUsuario, pickerItemArray1, pickerItemArray2 } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <ScrollView style={styles.container} >
                    <Card keyboardDismissMode='on-drag' title="Completa el formulario">
                        <KeyboardAvoidingView behavior='padding'>
                            <View>
                                <View style={{ marginBottom: 2, borderWidth: 1, borderColor: '#d0d2d3', borderRadius: 5 }}>
                                    <Picker style={styles.pickerStyle}
                                        mode='dropdown'
                                        selectedValue={this.state.pickerSelection1}
                                        onValueChange={(itemValue) => {
                                            this.actualizarLastname(itemValue);
                                            this.setState({ pickerSelection1: itemValue, changed: false });
                                            registroUsuario.name = itemValue;
                                        }}>
                                        {pickerItemArray1.map((item) => { return (<Picker.Item label={item} value={item} />) })}
                                    </Picker>

                                </View>
                                <View style={{ marginBottom: 2, borderWidth: 1, borderColor: '#d0d2d3', borderRadius: 5 }}>
                                    <Picker style={styles.pickerStyle}
                                        mode='dropdown'
                                        selectedValue={this.state.pickerSelection2}
                                        onValueChange={(itemValue) => {
                                            this.setState({ pickerSelection2: itemValue, changed: false });
                                            registroUsuario.lastname = itemValue;
                                        }}>
                                        {pickerItemArray2.map((item) => { return (<Picker.Item label={item} value={item} />) })}
                                    </Picker>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginRight: 50 }}>N° de pasajeros</Text>
                                    <NumericInput
                                        onChange={value => {
                                            registroUsuario.cantidad = value;
                                            this.setState({ changed: false })
                                        }}
                                        totalHeight={35}
                                        step={1}
                                        initValue={registroUsuario.cantidad}
                                        minValue={1}
                                        maxValue={15} />
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 9, marginTop: 5 }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{registroUsuario.privado ? 'Privado' : 'Compartido'}</Text>
                                    <Switch
                                        thumbColor={'rgba(223,62,62,1)'}
                                        trackColor={{ false: 'grey', true: 'rgba(223,62,62,1)' }}
                                        value={registroUsuario.privado}
                                        onValueChange={valor => {
                                            this.toogleSwitch(valor);
                                            this.setState({ changed: false })
                                        }}
                                    />
                                    <Text style={{ fontSize: 12, color: 'grey' }}>{registroUsuario.privado ? '' : '(*) Sujeto a disponibilidad'}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10 }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Precio: $ </Text>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'rgba(223,62,62,1)' }}>{this.formatoPrecio(registroUsuario.precio)}</Text>
                                </View>
                                <Form
                                    ref="form"
                                    type={RegistroUsuario}
                                    options={options}
                                    value={registroUsuario}
                                    onChange={(v) => this.onChange(v)}
                                />

                            </View>
                            <AppButton
                                bgColor="rgba(223,62,62,1)"
                                title="Solicitar  "
                                action={this.save.bind(this)}
                                iconName="plus"
                                iconSize={30}
                                iconColor="#fff"
                            />
                        </KeyboardAvoidingView>
                    </Card>

                </ScrollView>
            </BackgroundImage>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        padding: 10
    },
    textStyle: {
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerStyle: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red'
        //'#d0d2d3'
    },
    input: {
        width: 60,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d0d2d3'

    }
})



