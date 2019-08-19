import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Turismo Chile'
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
  render() {
    return (
      <BackgroundImage source={require('../assets/images/fondo2.jpg')}>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <View style={{ backgroundColor: 'rgba(62,62,223,1)' }}>
            <AppButton
              bgColor='rgba(62,62,223,1)'
              title="Entrar  "
              action={this.login.bind(this)}
              iconName="sign-in"
              iconColor="#fff"
            />
          </View>
          <View style={{ backgroundColor: 'rgba(223,62,62,1)', marginTop:10 }}>
            <AppButton
              bgColor='rgba(223,62,62,1)'
              title="Registrarme  "
              action={this.register.bind(this)}
              iconName="user-plus"
              iconColor="#fff"
            />
          </View>
        </View>
      </BackgroundImage>
    );
  }

}