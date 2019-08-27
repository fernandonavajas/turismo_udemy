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
export var user = {};
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
      user1: {}
    }
  }
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged((userFirebase) => {
      if (userFirebase !== null) {
        this.setState({
          isLogged: true,
          loaded: true,
          user1: userFirebase,

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
    const { isLogged, loaded, user1 } = this.state;

    if (!loaded) {
      return (<PreLoader />)
    }
    if (isLogged) {
      user=user1;

      return (<LoggedNavigation />)
    } else { 
      return (
        <GuestNavigation />
      );
    }
  }
}

