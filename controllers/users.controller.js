const { validationResult } = require('express-validator');
const usersService = require('../services/users.service');

async function getAll(req, res) {
  const users = await usersService.getUsers();
  res.json(users);
}

async function getById(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id, 10);
  const user = await usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }

  res.json(user);
}

async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = await usersService.createUser(req.body);
  res.status(201).json(newUser);
}

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id, 10);
  const updatedUser = await usersService.updateUser(id, req.body);

  if (!updatedUser) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }

  res.json(updatedUser);
}

async function remove(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = parseInt(req.params.id, 10);
  const deleted = await usersService.deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  }

  res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
