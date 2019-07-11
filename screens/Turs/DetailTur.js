import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import Tur from '../../components/Turismo/Tur';


export default class  DetailTur extends Component {

    constructor (props){
        super(props);
        const {params}= props.navigation.state;
        this.state= {
            tur: params.tur
        };
    }
    editTur(){

    }
    goHome(){

    }

    render() { 
        const {tur} = this.state;
        return ( 
            <BackgroundImage source={require('../../assets/images/fondo2.jpg')}>
                <ScrollView>
                    <Tur
                        goHome={this.goHome.bind(this)}
                        editTur={this.editTur.bind(this)}
                        tur={tur}
                    />
                </ScrollView>
            </BackgroundImage>
         );
    }
} 
