import React, { Component } from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;


export const Tur = t.struct({
	name: t.String,
	lastname: t.String,
	price: t.Number,
	description: t.String,
	duration: t.String
});
export const options = {
	fields: {
		name: {
			label: 'Tipo Tour',
			placeholder: 'Categoría'
		},
		lastname: {
			label: 'Tour Especifico',
			placeholder: 'Lugar'
		},
		price: {
			label: 'Precio',
			placeholder: '30000'

		},
		description: {
			label: 'Descripción',
			placeholder: 'Aquí la descripción',
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
		},
		duration: {
			label:'Duración',
			placeholder:'5 Horas 30 Minutos'
		}
	}
};