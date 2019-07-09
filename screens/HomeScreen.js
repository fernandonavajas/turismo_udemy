import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import { NavigationActions } from 'react-navigation';

export default class HomeScreen extends Component {
  static navigationOptions={
    title:'App Turismo'
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
          <AppButton
            bgColor="blue"
            title="Entrar  "
            action={this.login.bind(this)}
            iconName="sign-in"
            iconColor="#fff"
          />

          <AppButton
            bgColor="red"
            title="Registrarme  "
            action={this.register.bind(this)}
            iconName="user-plus"
            iconSize={30}
            iconColor="#fff"
          />

        </View>
      </BackgroundImage>
    );
  }

}