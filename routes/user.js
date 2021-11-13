//desestructurar algo que viene de express
const {Router} =require('express');

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

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;