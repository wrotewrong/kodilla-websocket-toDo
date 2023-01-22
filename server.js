const express = require('express');
const app = express();
const socket = require('socket.io');

const tasks = [];

app.use((req, res) => {
  res.status(404).send('Not found');
});

const server = app.listen(8000, () => {
  console.log('server is running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.emit('updateData', tasks);

  socket.on('addTask', ({ task, id }) => {
    tasks.push({ task, id });
    socket.broadcast.emit('addTask', { user, id });
  });

  socket.on('removeTask', (id) => {
    const index = tasks.findIndex((element) => element.id == id);
    if (index != -1) {
      tasks.splice(index, 1);
    }
    socket.broadcast.emit('removeTask', id);
  });
});
