import React, { Component } from 'react';
import Toast from 'react-native-simple-toast';
import *  as firebase from 'firebase';


export default class  Logout extends Component {
    componentDidMount(){
        firebase.auth().signOut()
        .then(()=>{
            Toast.showWithGravity("A cerrado sesión correctamente", Toast.LONG, Toast.BOTTOM)
        }).catch(error=>{
            Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM)

        })
    }
    render() {
        return (
             null
        );
    }
}
 
