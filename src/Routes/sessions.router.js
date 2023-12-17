import { Router } from 'express';
import passport from 'passport';


const sessionsRouter = Router();

sessionsRouter.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
	async (req, res) => {}
);

sessionsRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		req.session.user = req.user;
		res.redirect('/');
	}
);


  
sessionsRouter.post('/', (req, res) => {
    // Lógica de autenticación o gestión de sesiones aquí
    
  });

  // Ruta para el inicio de sesión
sessionsRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
	// Si la autenticación es exitosa, puedes responder con éxito aquí
	res.json({ message: 'Inicio de sesión exitoso' });
  });

export default sessionsRouter;