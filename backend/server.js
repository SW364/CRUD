// backend/server.js
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/users', usersRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
