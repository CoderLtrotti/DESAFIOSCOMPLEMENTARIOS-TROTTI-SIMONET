import express from 'express';
import handlerbars from 'express-handlebars';
import { create } from 'express-handlebars';
import config from './config/config.js';
import viewsRouter from './Routes/viewsRouter.js';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import ContenedorManager from './dao/ContenedorManager.js';
import CartManager from './dao/cartsManajer.js';

import loggerRouter from './Routes/loggerRouter.js';
import Cart from './dao/models/cart.js';
import router from './Routes/cartRouter.js'
import Productrouter from './Routes/products.js';
import cookieParser from 'cookie-parser';
import cookieRouter from './Routes/cookies.router.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './Routes/user.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport'; 

import loginrouter from './Routes/loginroutes.js';
import sessionsRouter from './Routes/sessions.router.js';
import bodyParser from 'body-parser';
import usersRouter from './Routes/user.router.js'
import businessRouter from './Routes/business.router.js'
import ordersRouter from './Routes/orders.router.js'
import cors from "cors"


import mockRoutes from './Routes/mockRoutes.js'; 
import upload from './utils/multerConfig.js'
import githubRouter from './Routes/github.router.js';
import handleError from './utils/errorHandler.js';




const app = express();
const contenedorManager = new ContenedorManager();
const cartManager = new CartManager();
const cart = new Cart();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080', methods: ["GET", "POST", "PUT"] }))

            //DB conection usando config archivo.env

            mongoose.connect(config.dbConnectionString, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Configurar la carpeta de vistas y el motor de plantillas
app.engine('handlebars', handlerbars.engine());
app.set('views', 'src/views');
/*app.set('views', '../views/');*/ //ruta alternativa para utilizar con node app.js
app.set('view engine', 'handlebars');
const hbs = create({
defaultLayout: '',
runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use('/api/cart', router);
app.use('/api/usersRouter', usersRouter)
app.use("/api/business", businessRouter)
app.use("/api/orders", ordersRouter)
app.use('/api1/products', Productrouter);
app.use('/api', mockRoutes);
app.use('/api/users', upload.array('documents'), usersRouter);

app.use('/api', loggerRouter);


  // Actualizar la cantidad de ejemplares

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser('')); // Aquí puedes agregar una clave secreta si lo deseas

    app.use(
      session({
        store: MongoStore.create({
          mongoUrl:
            config.dbConnectionString, // DB conection usando config archivo.env
          mongoOptions: {
            useNewUrlParser: true,
          },
          ttl: 15,
        }),
        secret: config.sessionSecret, //aqui la session secret usando config archivo.env
        resave: true,
        saveUninitialized: true,
      })
    );
 initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter);
//Middleware cookies
app.use('/api/sessions/github', githubRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/cookies', cookieRouter);
app.use('/',viewsRouter);
app.use('/api/users', userRouter);


app.use((error, req, res, next) => {

  if (error) {

        const error = new Error("Not Found");

        error.status = 404;

        next(error);

  } else {

        next();

  }

});

// Utiliza el manejador de errores definido
app.use((error, req, res, next) => {
  handleError(res, error);
});
app.use('/password', passwordRoutes);
// Usar el enrutador de vistas
app.use('/', viewsRouter);
app.use('/login', loginrouter);
const webServer = app.listen(8080, () => {
  console.log('Escuchando 8080');
});
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
import passwordRoutes from './Routes/passwordRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from './config/swaggerOptions.js'; export default app;



