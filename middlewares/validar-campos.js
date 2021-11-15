const {response, request} = require ('express');
const { validationResult } = require('express-validator');


const validarCampos = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    // si pasa continua con el siguiente middleware
    next();
}

module.exports = {
    validarCampos
}