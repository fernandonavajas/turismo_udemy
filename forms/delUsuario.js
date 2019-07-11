import React, { Component } from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;

export const Tur = t.struct({
    name: t.String,
    lastname: t.String,
    idioma: t.String,
    pasajeros: t.Number

});

export const options = {
    fields: {
        name: {
            label: 'Tipo Tour (*)',
            placeholder: 'Categoría'
        },
        lastname: {
            label: 'Tour Especifica (*)',
            placeholder: 'Lugar'
        },
        pasajeros: {
            label: 'N° de pasajeros (*)',
            placeholder: 'Cantidad'
        },
        idioma: {
            label: 'Idioma ',
            placeholder: 'Español',

        }
    }
};
