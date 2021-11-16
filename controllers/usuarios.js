//Desestructurar algo que viene de express
const {response, request} = require ('express');

const bcryptjs = require ('bcryptjs');

//Importar modelo 
//La 'U' mayúscula permitirá crear instancias de mi modeo
const Usuario = require('../models/usuario');

//Crear funciones y exportarlas
const usuariosGet = async (req = request, res = response) => {
//extraer los params 
//const {comida, type, nombre = 'No hay nombre'} = req.query;
    
    //Desestructurar el limite que viene de los argumentos
    const {limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find()
    .skip(parseInt(desde))
    .limit(parseInt(limite));

    res.json({
        usuarios
    });
};

const usuariosPost = async (req = request, res = response) => {    
    //extraer el body de la request
    //que se está solicitando
    //desestructurar lo que viene del body
    //pequeña validación al decirle que campos quiero desestructurar
    const {nombre, correo, password, role} = req.body;

    //Creamos una instancia de nuestro modelo
    const usuario = new Usuario({nombre, correo, password, role});


    //Verificar si el correo existe
   

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    //guardar en DB
    //Para grabar el registro
    //await para que espere esa grabación
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async (req = request, res = response) => {
    //después de params el nombre que le hemos dado en la ruta
    //const id = req.params.id;
    //desestructuramos todos los id
    const {id} = req.params;

    //Desestructurar información que viene en la request
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra bd

    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    //Actualizar este registro
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
    
    res.json(usuario);
};

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API -  controlador'
    });
};

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API- controlador'
    });
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
};