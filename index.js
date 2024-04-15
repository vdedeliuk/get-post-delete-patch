
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 1488;

app.use(bodyParser.json());

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.delete('/users/:id', deleteUserById);
app.patch('/users/:id', updateUserById);


let users = [
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
    { id: 3, name: 'User3' }
];


function getUsers(req, res) {
    res.json(users);
}

function getUserById(req, res) {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
}

function createUser(req, res) {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
}

function deleteUserById(req, res) {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.sendStatus(204);
}

function updateUserById(req, res) {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
}

// Server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});