const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const helmet = require('helmet'); // Added for security
const cors = require('cors'); // CORS module added
require('dotenv').config(); // Added for environment variables

app.use(helmet()); // Use helmet for security
app.use(cors()); // Use CORS middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  socket.on('new user', (username) => {
    console.log(`${username}님이 입장하셨습니다.`);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 끊었습니다.');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});