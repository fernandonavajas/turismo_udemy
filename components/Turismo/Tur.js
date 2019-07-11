import React, { Component } from 'react';
import AppButton from '../AppButton';
import {Card, Text} from 'react-native-elements';
import TurRating from './TurRating';


export default class Tur extends Component{
    render(){
        const {editTur, goHome, tur} = this.props;
        return(
            <Card
                title={Tur.name}
                image={require('../../assets/images/robot-dev.png')}
            >
                <TurRating turId={tur.id}/>
            </Card>
        )
    }
}
