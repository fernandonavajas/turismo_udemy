import React, { Component } from 'react';
import AppButton from '../AppButton';
import {StyleSheet, View} from 'react-native';


export default class  TurismoAddButton extends Component {
    render() { 
        const { addTurismo}=this.props;
        return (
            <View style={styles.buttonContainer}>
                <AppButton
                     bgColor="blue"
                     title="Añadir tur  "
                     action={addTurismo}
                     iconName="plus"
                     iconColor="#fff"
                     setWidth={true}
                />
            </View>
         );
    }
}
const styles = StyleSheet.create({
    buttonContainer:{ 
        position: 'absolute',
        alignSelf:'flex-end',
        bottom:0,
    }
});
 