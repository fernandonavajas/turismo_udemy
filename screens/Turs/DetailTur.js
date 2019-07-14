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
        const navigateAction = NavigationActions.navigate({
			routeName: 'EditTur',
			params: {tur: this.state.tur}
		});
		this.props.navigation.dispatch(navigateAction);
    }
    goHome(){
        const navigateAction = NavigationActions.navigate({
			routeName: 'ListTurs',
		});
		this.props.navigation.dispatch(navigateAction);
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
