import { Router } from "express";
import { IUsuario, Usuario } from '@libs/Usuario';

const router = Router();
const usuarioInstance = new Usuario();

router.get('/',async (_req, res) => {
    try {
        res.json(await usuarioInstance.getAllUsuario());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({ error: ex });
    }
});

router.get('/byindex/:index', async (req, res) => {
    try {
      const { index } = req.params;
      res.json(await usuarioInstance.getUsuarioByIndex(+index));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ 'msg': 'Error al obtener Registro' });
    }
  });

  router.post('/new', async (req, res) => {
    try {
      const newUsuario = req.body as unknown as IUsuario;
      const newUsuarioIndex = await usuarioInstance.addUsuario(newUsuario);
      res.json({ newIndex: newUsuarioIndex });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  
  });

  router.put('/update/:index', async (req, res) => {
    try {
      const { index } = req.params;
      const usuarioFromForm = req.body as IUsuario;
      await usuarioInstance.updateUsuario(+index, usuarioFromForm);
      res.status(200).json({ "msg": "Registro Actualizado" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
  
  router.delete('/delete/:index', (req, res) => {
    try {
      const { index } = req.params;
      if (usuarioInstance.deleteUsuario(+index)) {
        res.status(200).json({ "msg": "Registro Eliminado" });
      } else {
        res.status(500).json({ 'msg': 'Error al eliminar Registro' });
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ 'msg': 'Error al eliminar Registro' });
    }
  });

export default router;
