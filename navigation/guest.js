import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/Login";
import RegisterScreen from '../screens/Register';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Login:{
            screen: LoginScreen

        },
        Register:{
            screen: RegisterScreen

        },
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'red'
            },
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold'
            }
        }
    }
);

export default createAppContainer(AppNavigator);

