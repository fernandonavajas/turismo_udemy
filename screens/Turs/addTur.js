import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import AppButton from '../../components/AppButton';
import { View, StyleSheet } from 'react-native';
import *  as firebase from 'firebase';
import { options, Tur } from '../../forms/tur';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { Card } from 'react-native-elements';
import Toast from 'react-native-simple-toast';


export default class addTur extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tur: {
                name: '',
                address: '',
                capacity: 0,
                description: '',
            }
        };
    }

    save () {
		const validate = this.refs.form.getValue();
		if(validate) {
			let data = {};
			const key = firebase.database().ref().child('turs').push().key;
			data[`turs/${key}`] = this.state.tur;
			firebase.database().ref().update(data).then(() => {
				Toast.showWithGravity('Solicitud enviada con exito', Toast.LONG, Toast.BOTTOM);
				this.props.navigation.navigate('ListTurs');
			});
		}
	}

    onChange(tur) {
        this.setState({ tur });
    }

    render() {
        const { tur } = this.state;
        return (
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <View style={styles.container}>
                    <Card title="Formulario de Turs">
                        <View>
                            <Form
                                ref="form"
                                type={Tur}
                                options={options}
                                value={tur}
                                onChange={(v) => this.onChange(v)}
                            />
                        </View>
                        <AppButton
                            bgColor="rgba(255, 38, 74, 0.9)"
                            title="Dar de alta  "
                            action={this.save.bind(this)}
                            iconName="plus"
                            iconSize={30}
                            iconColor="#fff"
                        />
                    </Card>
                </View>
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



