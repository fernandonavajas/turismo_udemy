import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import *  as firebase from 'firebase';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Celebrate Chile'
  }
  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    this.props.navigation.dispatch(navigateAction);
  }
  register() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Register'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  loginWithoutEmail(){
    const navigateAction=NavigationActions.navigate({
      routeName:'ListTurs'
    });
    Toast.showWithGravity("Bienvenido", Toast.LONG, Toast.BOTTOM);
    firebase.auth().signInWithEmailAndPassword('publico@publico.com', '12345678')
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <BackgroundImage source={require('../assets/images/fondo2.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <View style={{ backgroundColor: 'rgba(62,62,223,1)', margin:10, borderRadius:5 }}>
            <AppButton
              bgColor='rgba(62,62,223,1)'
              title="Entrar  "
              action={this.login.bind(this)}
              iconName="sign-in"
              iconColor="#fff"
            />
          </View>
          <View style={{ backgroundColor: 'rgba(223,62,62,1)', margin:10, borderRadius:5 }}>
            <AppButton
              bgColor='rgba(223,62,62,1)'
              title="Registrarme  "
              action={this.register.bind(this)}
              iconName="address-card"
              iconColor="#fff"
            />
          </View>
          <View style={{ backgroundColor: 'rgba(192,192,192,1)', margin:10, borderRadius:5, marginTop:40 }}>
            <AppButton
              bgColor='rgba(192,192,192,1)'
              title="Entrar sin registrarme  "
              action={this.loginWithoutEmail.bind(this)}
              iconName="angle-double-right"
              iconColor="#fff"
            />
          </View>
        </View>
      </BackgroundImage>
    );
  }

}