// importar módulos de terceros
const express = require('express');
const session = require('express-session');

const morgan = require('morgan');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const USERNAME = 'admin';
const PASSWORD = 'admin';

// importar las rutas públicas
const indexRoutes = require('./routes/index.js');

// importar las rutas de administrador
const adminRoutes = require('./routes/admin.js');


// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

app.use(session({
    secret: 'miSecretoSuperSecreto', // Cambia esto a algo más seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true en producción con HTTPS
}));


// Añadimos las ritas de index.js en nuestra app
// El primer parámetro significa que todas las rutas que se encuentren en 'indexRouter' estarán prefijados por '/'
// Voy a prefijar todas las rutas de administrador con '/admin'

// Middleware para proteger las rutas de administrador
app.use('/admin', (req, res, next) => {
    if (req.session.isAuthenticated) {
        res.locals.isAdmin = true;
        next();
    } else {
        res.redirect('/login');
    }
});

app.use('/admin', adminRoutes);
app.use('/', indexRoutes);

app.get('/login', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Usuario" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect('/');
    } else {
        res.send('Usuario o contraseña incorrectos');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error al cerrar sesión');
        }
        res.redirect('/login');
    });
});

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});
