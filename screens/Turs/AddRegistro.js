import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { View, StyleSheet, ScrollView, Picker, Text } from 'react-native';
import *  as firebase from 'firebase';
import { options, RegistroUsuario } from '../../forms/delUsuario';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { user1 } from '../../App'

export default class AddRegistro extends Component {

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
             //picker 1
            pickerItemArray:[
                "Cordillera", "Viñedos", "Playa"
            ],
            pickerSelection: '',
            registroUsuario: {
                name: params.tur.name,
                lastname: params.tur.lastname,
                fecha: '',
                nameUser: '',
                phone: '',
                cantidad: 2,
                idioma: 'E',
                privado: true,
                tipoPago: 'E',
                precio: (params.tur.price),
                comentario: '',
                conductor: '',
                color: false,
                emailDelRegistro: user1.email,
            },
            loaded: false,

        }
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

    onChange(registroUsuario) {
        this.setState({ registroUsuario });
    }
    updateName(name) {
        this.setState({ name });
    }


    render() {
        const { registroUsuario, pickerItemArray, pickerItemArray1 } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <ScrollView style={styles.container} >
                    <Card keyboardDismissMode='on-drag' title="Formulario de Usuario">
                        <View>
                            <Picker style={styles.pickerStyle}
                                selectedValue={this.state.pickerSelection}
                                onValueChange={(itemValue) => this.setState({ pickerSelection: itemValue })}>
                                    {pickerItemArray.map((item)=>{
                                        return(<Picker.Item label={item} value={item}/>)
                                    })}
                            </Picker>
                            <Form
                                ref="form"
                                type={RegistroUsuario}
                                options={options}
                                value={registroUsuario}
                                onChange={(v) => this.onChange(v)}
                            />

                        </View>
                        <AppButton
                            bgColor="rgba(255, 38, 74, 0.9)"
                            title="Solicitar  "
                            action={this.save.bind(this)}
                            iconName="plus"
                            iconSize={30}
                            iconColor="#fff"
                        />
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
        height: 50,
        color: '#344953',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d0d2d3',
        color: '#d0d2d3'
    }
})



