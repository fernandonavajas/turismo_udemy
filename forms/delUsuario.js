import React, { Component } from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import moment from 'moment/src/moment';
moment.locale('es');
//Form.stylesheet.dateValue.normal.backgroundColor= 'red';



var Idioma = t.enums({
    E: 'Español',
    P: 'Portugués',
    I: 'Inglés'
});

var TipoPago = t.enums({
    E: 'Efectivo',
    CD: 'Credito / Débito'

})
export const RegistroUsuario = t.struct({
    name: t.String,
    lastname: t.String,
    fecha: t.Date,
    nameUser: t.String,
    phone: t.Number,
    cantidad: t.Number,
    idioma: Idioma,
    privado: t.Boolean,
    tipoPago: TipoPago,
    precio: t.Number,
    comentario: t.maybe(t.String),

});
export const options = {
    order: ['nameUser','name','lastname', 'fecha', 'phone', 'cantidad', 'idioma', 'privado', 'tipoPago', 'precio', 'comentario'],
    fields: {
        name: {
            label: 'Tipo Tour',
            placeholder: '',
        },
        lastname: {
            label: 'Tour Especifico',
            placeholder: '',
        },
        fecha: {
            label: 'Fecha de salida',
            mode: 'date',
            initialDate: new Date(),
            minimumDate: new Date(),
            config: {
                defaultValueText: 'selecciona la fecha',
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
            placeholder: 'Nombre del encargado',
            autoFocus: true
        },
        phone: {
            label: 'Teléfono',
            placeholder: 'Teléfono del encargado'
        },
        cantidad: {
            label: 'N° de personas',
            placeholder: '¿Cuantas personas van?'
        },

        idioma: {
            label: 'Idioma',
            placeholder: 'Español'
        },
        tipoPago: {
            label: 'Tipo pago',

        },
        privado: {
            label: 'Privado ',
            tintColor: 'red',
            stylesheet: {
                ...Form.stylesheet,
                formGroup: {
                    ...Form.stylesheet.formGroup,
                    normal: {
                        ...Form.stylesheet.formGroup.normal,
                        flexDirection: 'row',

                    },
                    error: {
                        ...Form.stylesheet.formGroup.error,
                        flexDirection: 'row',
                    }
                },
            },
        },
        precio: {
            label: 'Precio Total:',
            editable: false,
            stylesheet: {
                ...Form.stylesheet,
                formGroup: {
                    ...Form.stylesheet.formGroup,
                    normal: {
                        ...Form.stylesheet.formGroup.normal,
                        flexDirection: 'row',

                    },
                    error: {
                        ...Form.stylesheet.formGroup.error,
                        flexDirection: 'row',
                    }
                },
                controlLabel: {
                    ...Form.stylesheet.controlLabel,
                    normal: {
                        ...Form.stylesheet.controlLabel.normal,
                        marginBottom: 2,
                        marginRight: 20,
                        color: "green",
                        fontWeight: 'bold',
                    },
                    error: {
                        ...Form.stylesheet.controlLabel.error,
                        marginBottom: 2,
                        marginRight: 20,
                        color: "green"
                    }
                },
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                    },
                    notEditable: {
                        ...Form.stylesheet.textbox.notEditable,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderColor: 'green',
                        backgroundColor: '#fff',
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }
                }
            }
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
