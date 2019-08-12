import React from 'react';
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import TursScreen from "../screens/Turs/Turs";
import addTurScreen from '../screens/Turs/addTur';
import LogoutScreen from "../screens/Logout";
import DetailTurScreen from '../screens/Turs/DetailTur';
import TurEspecificoScreen from '../screens/Turs/turEspecifico';
import AddRegistroScreen from '../screens/Turs/AddRegistro';
import HistorialScreen from '../screens/Turs/Historial'
import HistorialEspecificoScreen from '../screens/historial/DetalleHistorial'
import RegistroEspecificoScreen from '../screens/admin/RegistroEspecifico'
import { user } from '../App';//Usuario Actual user.email para el mail


const navigationOptions = {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'rgba(223,62,62,1)'
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
    style={{ marginLeft: 15 }}
    size={30}
    color="white"
    onPress={() => navigation.openDrawer()}
/>;

const rightIcon = (navigation, icon) => <Icon
    name={icon}
    style={{ marginRight: 15 }}
    size={30}
    color="white"
    onPress={() => navigation.navigate('ListTurs')}
/>;

const tursScreenStack = createStackNavigator({
    ListTurs: {
        screen: TursScreen,
        navigationOptions: ({ navigation }) => ({
            ...navigationOptions,
            title: 'Tours',
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    AddTur: {
        screen: addTurScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Añadir Tour',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    DetailTur: {
        screen: DetailTurScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Detalles del Tour',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    TurEspecifico: {
        screen: TurEspecificoScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Tours disponibles',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    RegistroUsuario: {
        screen: AddRegistroScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Solicitar Tour',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })

    },
    RegistroEspecifico: {
        screen: RegistroEspecificoScreen,
        navigationOptions: ({ navigation }) => ({
            ...navigationOptions,
            title: 'Solicitudes',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },


},
    navigationOptions
);
const logoutScreenStack = createStackNavigator({
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Cerrar sesión'
        })
    }
}
);

const historialScreenStack = createStackNavigator({
    HistorialScreen: {
        screen: HistorialScreen,
        navigationOptions: ({ navigation }) => ({
            ...navigationOptions,
            title: 'Historial',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    },
    HistorialEspecifico: {
        screen: HistorialEspecificoScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Detalle del Tour',
            headerRight: rightIcon(navigation, 'home'),
            headerLeft: leftIcon(navigation, 'bars')
        })
    }
},
    navigationOptions
);

const RootStack = createDrawerNavigator(
    {
        TursScreen: {

            screen: tursScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Lista de Turs',
                drawerIcon: ({ tintColor }) => (<Icon name="home" size={30} style={{ color: tintColor }} />),
            })
        },
        HistorialScreen: {
            screen: historialScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Historial',
                drawerIcon: ({ tintColor }) => (<Icon name="list" size={30} style={{ color: tintColor }} />),
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