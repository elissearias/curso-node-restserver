//desestructurar algo que viene de express
const {Router} =require('express');

//importat check de express-validator
const {check} = require('express-validator');

const Role = require ('../models/role');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require ('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

//permite llamar esa función
// a router le voy a configurar las rutas
const router = Router();

//endpoint
//mando la referencia a la misma
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

//check middleware que especifico que campo del body debe revisar
//si es correo no funciona mando un string diciendo que no es válido
//seguido de un .isEmail
router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio más de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        //check('role', 'No es un role permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom( async (role='') => {
                const existeRole = await Role.findOne({role});
                if(!existeRole){
                        throw new Error(`El role ${role} no se encuentra registrado en la base de datos`);
                }
        }),
        validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;