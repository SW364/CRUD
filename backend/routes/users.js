// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(rows);
  });
});

// Crear usuario
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) return res.status(500).json({ error: 'Error al crear usuario' });
    res.json({ id: this.lastID, name, email });
  });
});

// Editar usuario
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
      res.json({ updated: this.changes });
    }
  );
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
