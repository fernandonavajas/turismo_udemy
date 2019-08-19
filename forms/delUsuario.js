import t from 'tcomb-form-native';
const Form = t.form.Form;
import moment from 'moment/src/moment';
moment.locale('es');
//Form.stylesheet.dateValue.normal.backgroundColor= 'red';



var Idioma = t.enums({
    Español: 'Español',
    Portugues: 'Portugués',
    Ingles: 'Inglés'
});

var TipoPago = t.enums({
    Efectivo: 'Efectivo',
    Credito_Debito: 'Credito / Débito'

})
export const RegistroUsuario = t.struct({
    fecha: t.Date,
    nameUser: t.String,
    phone: t.Number,
    idioma: Idioma,
    tipoPago: TipoPago,
    comentario: t.maybe(t.String),

});
export const options = {
    order: ['tipoPago', 'nameUser', 'phone', 'fecha', 'idioma', 'comentario'],
    fields: {
        fecha: {
            label: 'Fecha de salida',
            mode: 'date',
            initialDate: new Date(),
            minimumDate: new Date(),
            config: {
                defaultValueText: 'selecciona la fecha de salida',
                format: (date) => moment(date).format(' DD-MM-YYYY')//'dddd DD-MM-YYYY'
            },
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
        nameUser: {
            label: 'Nombre',
            placeholder: 'Nombre del solicitante'

        },
        phone: {
            label: 'Teléfono',
            placeholder: 'Teléfono del solicitante'
        },

        idioma: {
            label: 'Idioma',
            placeholder: 'Español'
        },
        tipoPago: {
            label: 'Tipo pago',

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
