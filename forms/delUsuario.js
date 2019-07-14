import React, { Component } from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import moment from 'moment/src/moment';
moment.locale('es');
//Form.stylesheet.dateValue.normal.backgroundColor= 'red';

var Privado = t.enums({
    P: 'Privado',
    C: 'Compartido'
});

var TipoPago = t.enums({
    E: 'Efectivo',
    CD: 'Credito / Debito'

})
export const RegistroUsuario = t.struct({
    categoria: t.String,
    lugar: t.String,
    fecha: t.Date,
    name: t.String,
    phone: t.Number,
    cantidad: t.Number,
    idioma: t.String,
    privado: Privado,
    tipoPago: TipoPago,
    precio: t.Number,
    comentario: t.maybe(t.String),

});
export const options = {
    order:['categoria','lugar','fecha','name','phone','cantidad','idioma','privado','tipoPago','precio','comentario'],
    fields: {
        categoria: {
            label: 'Tipo Tour',
            placeholder: 'Categoría'
        },
        lugar: {
            label: 'Tour Especifico',
            placeholder: 'Lugar'
        },
        fecha: {
            label: 'Fecha de salida',
            mode: 'date',
            config:{
                format: (date) => moment(date).format(' DD-MM-YYYY')//'dddd DD-MM-YYYY'
            },
            defaultValueText: new Date(),
            initialDate: new Date(),
            minimumDate: new Date(),
            stylesheet: {
                ...Form.stylesheet,
                dateValue: {
                    ...Form.stylesheet.dateValue,
                    normal: {
                        ...Form.stylesheet.dateValue.normal,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#d0d2d3',
                        color: '#d0d2d3'
                    },
                    error: {
                        ...Form.stylesheet.dateValue.error,
                        borderColor: 'red'
                    }
                }
            }

        },
        name: {
            label: 'Nombre',
            placeholder: 'Hector Carrasco'
        },
        phone: {
            label: 'Telefono',
            placeholder: '979692718'
        },
        cantidad: {
            label: 'N° de personas',
            placeholder: '3'
        },
        
        idioma: {
            label: 'Idioma',
            placeholder: 'Español'
        },
        tipoPago: {
            label: 'Tipo pago'
        },
        privado: {
            label:'Privado o compartido'
        },
        precio: {
            label: 'Precio Total',
            editable: false
        },
        comentario: {
            label: 'Comentario adicional',
            placeholder: 'Comentarios....',
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