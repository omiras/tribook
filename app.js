// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();

// importar las rutas públicas
const indexRoutes = require('./routes/index.js');

// importar las rutas de administrador
const adminRoutes = require('./routes/admin.js');


// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

// Configurar sesión
app.use(session({
    secret: 'miSecretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true en producción con HTTPS
}));

app.use((req, res, next) => {
    // le pasamos a la variable res.locals todo el objeto req.session
    // La primera vez que creamos esta sesión, diremos que el usuario ha visitado 0 veces la pagina de Home
    if (!req.session.visitedHome) {
        req.session.visitedHome = 0;
    }
    next();
});

// endpoint para obtener un formulario de login
// TODO: Tener esto en una vista
app.get('/login', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Usuario" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
});

const USERNAME = "admin";
const PASSWORD = "admin";

app.post('/login', (req, res) => {
    // Obtener el usuario y contraseña del formulario
    const { username, password } = req.body;

    // TODO.: Crear un modelo de Users. Crear un Schema que guarde los usuarios de tipo administrador en tu base de datos de MongoDB (username, password).

    // TODO+: Crear una pagina para registrar nuevos usuarios administradores

    // Si el usuario y contraseña coinciden con el de nuestra "base de datos", entonces nos guardaremos la información de que el cliente esta autentificado.
    if (username === USERNAME && password === PASSWORD) {
        req.session.isAuthenticated = true;
        res.locals.isAdmin = true;

        res.redirect('/');
    } else {
        res.send('Usuario o contraseña incorrectos');
    }
});

// endpoint para gestionar el logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error al cerrar sesión');
        }
        res.redirect('/login');
    });
});

// Vamos a pasar una variable a todas las vistas. Vamos a indicar si el usuario que está accediendo a la vista es de tipo administrador o no. Eventualmente, esta información debería proceder de una base de datos de usuario. Ahora mismo todas las rutas '/admin' se considera que accede un usuario de tipo adiministrador
app.use((req, res, next) => {
    // La variable req.locals es una variable "global" de tipo objecto a la que todas las vistas pueden acceder
    // Por defecto, no soy un usuario administrador
    res.locals.isAdmin = false;
    res.locals.title = "PATATA";

    // tenemos que ejecutar next() para que la petición HTTP siga su curso
    next();
})

// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

// Añadimos las ritas de index.js en nuestra app
// El primer parámetro significa que todas las rutas que se encuentren en 'indexRouter' estarán prefijados por '/'
// Voy a prefijar todas las rutas de administrador con '/admin'

// Middleware para proteger las rutas de administrador
app.use('/admin', (req, res, next) => {
    // Miramos si el usuario esta autentificado
    if (req.session.isAuthenticated) {
        // Si es que si, establecemos que es de tipo administrador y permitimos que siga la petición
        res.locals.isAdmin = true;
        next();
    } else {
        // en caso contrario lo llevamos a la vista de login
        res.redirect('/login');
    }
});

app.use('/admin', adminRoutes);
app.use('/', indexRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});
