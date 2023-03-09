const express = require('express');
const users = require('./routes/users');
const messages = require('./routes/messages');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://simple-express-api.onrender.com'
  ]
}));

app.use('/api/users', users);
app.use('/api/messages', messages);

// Add socket.io web sockets
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://simple-express-api.onrender.com',
      'http://localhost:3000',
      'http://localhost:5000'
    ]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (data) => {
    io.emit('newMessage', data);
  });

  socket.on('deleteMessage', (data) => {
    io.emit('messageDeleted', data.id);
  });
});

module.exports = { app, http };