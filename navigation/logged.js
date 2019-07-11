import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import TursScreen from "../screens/Turs/Turs";
import addTurScreen from '../screens/Turs/addTur';
import LogoutScreen from "../screens/Logout";
import DetailTurScreen from '../screens/Turs/DetailTur'



const navigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'red'
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
            //flex: 1
        }
    }
};

const leftIcon = (navigation, icon) => <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={20}
    color="white"
    onPress={() => navigation.openDrawer()}
/>;

const rightIcon = (navigation, icon) => <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={30}
    color="white"
    onPress={() => navigation.navigate('ListTurs')}
/>;

const tursScreenStack = createStackNavigator({
    ListTurs: {
        screen: TursScreen,
        navigationOptions: ({ navigation }) => ({
            ...navigationOptions,
            title: 'Turs',
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    addTur: {
        screen: addTurScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Añadir Tur',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    DetailTur: {
        screen: DetailTurScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Detalles del Tur',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    }
},
    navigationOptions
)
const logoutScreenStack = createStackNavigator({
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Cerrar sesión'
        })
    }
});

const RootStack = createDrawerNavigator(
    {
        TursScreen: {
            screen: tursScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Lista de Turs',
                drawerIcon: ({ tintColor }) => (<Icon name="home" size={30} style={{ color: tintColor }} />),
            })
        },
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Cerrar sesión',
                drawerIcon: ({ tintColor }) => (<Icon name="sign-out" size={30} style={{ color: tintColor }} />),
            })
        }
    },
    {
        drawerBackgroundColor: 'rgba(128,35,60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle: {
                marginVertical: 0,
            }
        },
        defaultNavigationOptions: navigationOptions
    }
)
export default createAppContainer(RootStack)