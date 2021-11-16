
const {Schema, model} = require('mongoose');

//objeto
const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },

    img: {
        type: String
    },

    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        defult: false
    }
});

//Quitar contraseña de una forma global para no mostrarla 
//sobrescribir método llamado toJSON
UsuarioSchema.methods.toJSON = function () {
    //desestructuración
    const { __v, password, ...usuario } = this.toObject();

    //cuando se llame la función regreso el usuario
    return usuario;
}



module.exports = model('Usuario',UsuarioSchema);