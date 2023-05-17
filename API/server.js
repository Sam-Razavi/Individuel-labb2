const express = require("express")
const booksroute = require("./src/books/routes")
const app = express();
var bodyParser = require('body-parser')
const cors = require('cors');
const http = require('http').Server(app);
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use('/api' , booksroute);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/index.html'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});







  