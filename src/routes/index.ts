import express from 'express';

import UsuarioRouter  from './Usuarios';

const router  = express.Router();

router.use('/usuario', UsuarioRouter);


export default router;
