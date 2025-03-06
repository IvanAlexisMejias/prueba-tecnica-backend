# 🚀 Manual Backend del Sistema de Monitoreo de Temperatura en Tiempo Real

## 🏠 Descripción del Backend
Sistema backend desarrollado con **Node.js** y **Express**, encargado de simular temperaturas en tiempo real, gestionando usuarios con autenticación JWT, y enviando alertas por email si se supera un umbral. Además, establece comunicación en tiempo real con el frontend mediante **Socket.IO**.

Repositorio del backend: [https://github.com/IvanAlexisMejias/prueba-tecnica-backend](https://github.com/IvanAlexisMejias/prueba-tecnica-backend)

⚠️ Importante:
- Debes tener este backend corriendo para que el frontend funcione correctamente.
- Ejecutar el servidor con:
  ```bash
  node server.js
  ```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología          | Descripción                                              |
|---------------------|----------------------------------------------------------|
| **Node.js**        | Entorno de ejecución para JavaScript en backend.        |
| **Express**        | Framework para crear el servidor HTTP.                   |
| **Socket.IO**      | Comunicación en tiempo real con clientes.                |
| **Nodemailer**     | Envío de correos electrónicos de alerta.                |
| **bcrypt**         | Encriptación de contraseñas.                            |
| **jsonwebtoken**   | Generación y validación de tokens JWT.                  |
| **cors**           | Permitir peticiones desde otros orígenes.               |

---

## 🧩 Instalación del Backend

### ✅ Requisitos:
- Node.js v16 o superior.
- npm.

### 🚀 Pasos:
1. Clona el repositorio:
```bash
git clone https://github.com/IvanAlexisMejias/prueba-tecnica-backend.git
```
2. Accede a la carpeta del backend:
```bash
cd backend
```
3. Instala las dependencias:
```bash
npm install
```
4. Inicia el servidor:
```bash
node server.js
```
5. El backend correrá en:
```
http://localhost:3001/
```

---

## 📦 Dependencias del `package.json`

### Dependencias principales:
```json
"dependencies": {
  "axios": "^1.7.9",
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "nodemailer": "^6.9.16",
  "pg": "^8.13.1",
  "socket.io": "^4.8.1"
}
```

---

## 🔄 Flujo de Funcionamiento
1️⃣ Generación de temperatura aleatoria cada 5 segundos.
2️⃣ Emisión de temperatura y umbral al frontend mediante Socket.IO.
3️⃣ Verificación del umbral y envío de correos si la temperatura lo supera.
4️⃣ Registro e inicio de sesión de usuarios.
5️⃣ Generación de token JWT válido por 1 hora tras el login.
6️⃣ Protección de rutas mediante middleware de autenticación.

---

## 🖥️ Funcionalidades Principales
- Simulación de temperaturas en tiempo real.
- Comunicación en tiempo real con el frontend.
- Registro y autenticación de usuarios con JWT.
- Envío automático de correos de alerta.
- Protección de rutas mediante tokens.

---

## 📧 Advertencias y Recomendaciones
- El token expira tras 1 hora; luego será necesario iniciar sesión nuevamente.
- Verifica que las credenciales de correo configuradas en Nodemailer sean correctas.
- Asegúrate de que el puerto `3001` esté libre.
- Mantén conexión activa con el frontend en `http://localhost:5173/`.
- Actualmente los usuarios se almacenan en memoria (sin base de datos).

---

## 📞 Soporte y Contacto
📧 Email: [ivan.mejiasm@gmail.com](mailto:ivan.mejiasm@gmail.com)  
🔗 Repositorio Backend: [https://github.com/IvanAlexisMejias/prueba-tecnica-backend](https://github.com/IvanAlexisMejias/prueba-tecnica-backend)

---
