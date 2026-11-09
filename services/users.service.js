const fs = require('node:fs/promises');
const path = require('node:path');

const FILE_PATH = path.join(__dirname, '..', 'data', 'users.json');

async function getUsers() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await saveUsers([]);
      return [];
    }
    throw err;
  }
}

async function saveUsers(users) {
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), 'utf8');
}

async function getUserById(id) {
  const users = await getUsers();
  return users.find(u => u.id === id) || null;
}

async function createUser(data) {
  const users = await getUsers();
  const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
  const newUser = {
    id: maxId + 1,
    name: data.name,
    email: data.email
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

async function updateUser(id, data) {
  const users = await getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;

  users[index] = {
    id,
    name: data.name,
    email: data.email
  };
  await saveUsers(users);
  return users[index];
}

async function deleteUser(id) {
  const users = await getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  await saveUsers(users);
  return true;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
