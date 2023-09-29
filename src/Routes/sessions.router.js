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

  sessionsRouter.post(
	'/login',
	passport.authenticate('local', {
	  successRedirect: '/', 
	  failureRedirect: '/login', 
	  failureFlash: true,
	})
  );
  
  sessionsRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/'); // Ajusta según tu aplicación
  });
  
  
export default sessionsRouter;