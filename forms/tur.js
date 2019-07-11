import React, { Component } from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;


export const Tur = t.struct({
    name:t.String,
    address: t.String,
    capacity: t.Number,
    descripcion: t.String
    
});

export const options = {
	fields: {
		name: {
			label: 'Nombre (*)',
			placeholder: 'Nombre'
		},
		address: {
			label: 'Dirección (*)',
			placeholder: 'Dirección'
		},
		capacity: {
			label: 'Capacidad',
			help: 'Capacidad en personas',
			config: {
				step: 1,
				min: 1,
				max: 100
			}
		},
		description: {
			label: 'Descripción (*)',
			placeholder: 'Descripción',
			multiline: true,
			stylesheet: {
				...Form.stylesheet,
				textbox: {
					...Form.stylesheet.textbox,
					normal: {
						...Form.stylesheet.textbox.normal,
						height: 150
					},
					error: {
						...Form.stylesheet.textbox.error,
						height: 150
					}
				}
			}
		}
	}
};

