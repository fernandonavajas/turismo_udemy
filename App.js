import React from 'react';
import PreLoader from './components/PreLoader';
import firebaseConfig from './utils/firebase';
import *  as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
import GuestNavigation from './navigation/guest';
import LoggedNavigation from './navigation/logged';
import moment from "moment";
moment.locale('es');

console.disableYellowBox = true;
export var user1= {};
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,//el usuario esta loggeado
      loaded: false,// ha cargado el contenido
      user: {}
    }
  }
  async componentDidMount() {
    //firebase.auth().signOut();// cerrar sesion en firebase
    await firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        user1=user;
        this.setState({
          isLogged: true,//este cambia la vista
          loaded: true,
          user: user
        });
      } else {
        this.setState({
          isLogged: false,
          loaded: true
        });
      }
    })
  }

  render() {
    const { isLogged, loaded, user } = this.state;

    if (!loaded) {
      return (<PreLoader />)
    }
    if (isLogged) {
      console.log(user1.email) //que usuario esta logeado
      return (<LoggedNavigation />)
    } else { // si no esta loggeado que abra la navegacion del guest
      return (
        <GuestNavigation />
      );
    }
  }
}

