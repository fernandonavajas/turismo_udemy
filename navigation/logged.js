import React, { Component } from 'react';
import PaseosScreen from "../screens/Paseos/Paseos";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';




const navigationOptions = {
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
    onPress={() => navigation.navigate('ListPaseos')}
/>;

const paseosScreenStack = createStackNavigator(
    {
        ListPaseos: {
            screen: PaseosScreen,
            navigationOptions: ({ navigation }) => ({
                ...navigationOptions,
                title: 'Salidas',
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    },
    navigationOptions
)

const RootStack = createDrawerNavigator(
    {
        PaseosScreen: {
            screen: paseosScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Valoraciones',
                drawerIcon:({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}}/>),
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
        defaultNavigationOptions:navigationOptions
    }
)
export default createAppContainer(RootStack)