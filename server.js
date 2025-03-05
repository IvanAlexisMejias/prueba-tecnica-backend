const express = require('express'); //manejar tutas y peticiones
const app = express();
const http = require('http'); //crea servidor
const { Server } = require('socket.io'); //para endpoints
const cors = require('cors'); //middleware
const nodemailer = require('nodemailer'); //enviar correos
const bcrypt = require('bcrypt'); //encriptar contraseñas
const jwt = require('jsonwebtoken'); //genera y valida tokesn

//crea el servidor que usara el framework
const server = http.createServer(app); 

//middlewares globales
app.use(cors());
app.use(express.json());

// Configuración del servidor de WebSocket
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

let users = [];// aqui simulo la base de datos (escalable)
let temperature = 20;
let threshold = 30;

// Configuración de transporte de Nodemailer 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ivanalexismejias1@gmail.com',  // Correo desde el cual se envian las alertas
        pass: 'rbec zofb qivc vene',  
    },
    tls: {
        rejectUnauthorized: false,  // Permitir certificados autofirmados (no pasar asi a produccion)
    },
});

// Simulación de temperatura cada 5 segundos
setInterval(() => {
    temperature = Math.random() * (40 - 15) + 15; 
    io.emit('temperatureUpdate', { temperature, threshold });
    checkTemperatureThreshold();
}, 5000);

// Verifica si la temperatura supera el umbral
function checkTemperatureThreshold() {
    if (temperature > threshold) {
        users.forEach(user => {
            sendEmail(user.email, temperature);
        });
    }
}
//funcionalidad incompleta (era para obtener datos de CPU)
app.post('/cores', (req) => {
    io.emit('coresUsage', { data: req.body});
});

// Función para enviar correos
function sendEmail(email, temp) {
    const mailOptions = {
        to: email,  // Destinatario
        subject: 'Alerta de Temperatura',
        text: `¡Alerta! La temperatura ha superado el umbral. Temperatura actual: ${temp.toFixed(2)}°C`,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('Error enviando correo:', error);
        } else {
            console.log('Correo enviado a:', email);
        }
    });
}


// Ruta de registro de usuarios
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword }); 
    res.json({ message: 'Usuario registrado correctamente' });
});

// Ruta de login de usuarios
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email }, 'secreto', { expiresIn: '1h' });
        res.json({ success: true, token, message: 'Inicio de sesión exitoso' });
    } else {
        res.json({ success: false, message: 'Credenciales inválidas' });
    }
});



// Middleware para proteger rutas (JWT)
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token.split(' ')[1], 'secreto', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Ruta protegida para obtener temperatura
app.get('/protected/temperature', authenticateToken, (_req, res) => {
    res.json({ temperature, threshold });
});

// Manejo de WebSockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.emit('temperatureUpdate', { temperature, threshold });

    socket.on('setThreshold', (newThreshold) => {
        threshold = newThreshold;
        io.emit('temperatureUpdate', { temperature, threshold });
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar servidor
server.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
