//Desestructurar algo que viene de express
const {response, request} = require ('express');


//Crear funciones y exportarlas
const usuariosGet = (req = request, res = response) => {
    //extraer los params 
    const {comida, type, nombre = 'No hay nombre'} = req.query;
    
    res.json({
        msg: 'get API - controlador',
        comida,
        type, 
        nombre
    });
};

const usuariosPut = (req = request, res = response) => {
    //después de params el nombre que le hemos dado en la ruta
    //const id = req.params.id;
    //desestructuramos todos los id
    const {id} = req.params;
    
    res.json({
        msg: 'put API - controlador',
        id
    });
};

const usuariosPost = (req, res = response) => {
    //extraer el body de la request
    //que se está solicitando
    //desestructurar lo que viene del body
    //pequeña validación al decirle que campos quiero desestructurar
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API -  controlador'
    });
};

const usuariosPatch = (req, res = response) => {
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