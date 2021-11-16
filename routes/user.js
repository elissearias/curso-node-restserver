//desestructurar algo que viene de express
const {Router} =require('express');

//importat check de express-validator
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require ('../controllers/usuarios');

//permite llamar esa función
// a router le voy a configurar las rutas
const router = Router();

//endpoint
//mando la referencia a la misma
router.get('/', usuariosGet);



//check middleware que especifico que campo del body debe revisar
//si es correo no funciona mando un string diciendo que no es válido
//seguido de un .isEmail
router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio más de 6 letras').isLength({min:6}),
        check('correo').custom(emailExiste),
        //check('role', 'No es un role permitido').isIn('ADMIN_ROLE', 'USER_ROLE'),
        check('role').custom(esRoleValido),
        validarCampos
], usuariosPost);

router.put('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.delete('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;