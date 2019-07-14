import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { View, StyleSheet, ScrollView } from 'react-native';
import *  as firebase from 'firebase';
import { options, RegistroUsuario } from '../../forms/delUsuario';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';


export default class AddRegistro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registroUsuario: {
                categoria: '',
                lugar: '',
                fecha: '',
                name: '',
                phone: '',
                cantidad: '',
                idioma: '',
                privado: '',
                tipoPago: '',
                precio: '',
                comentario: '',
            }
        };
    }

    save() {
        const validate = this.refs.form.getValue();
        if (validate) {
            let data = {};
            const key = firebase.database().ref().child('registro').push().key;
            data[`registro/${key}`] = this.state.tur;
            firebase.database().ref().update(data).then(() => {
                Toast.showWithGravity('Solicitud enviada con exito', Toast.LONG, Toast.BOTTOM);
                this.props.navigation.navigate('ListTurs');
            });
        }
    }

    onChange(registroUsuario) {
        this.setState({ registroUsuario });
    }

    render() {
        const { registroUsuario } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <ScrollView style={styles.container}>
                    <Card title="Formulario de Usuario">
                        <View>
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
                            title="Agregar  "
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
    }
});



