const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();

// app.use(express.static('public', { extensions: ['html', 'js'] }));
app.use('/views',express.static('views'));


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'))

const server = http.createServer(app);
const io = socketIo(server);

// Serve the HTML file
app.get('/', (req, res) => {
  res.render('client');
});

let userName='';
app.get('/views/chat', (req, res) => {
   userName=req.query.data;
    res.render('chat');
  });

var user=0;
io.on('connection', (socket) => {
    socket.name=userName;
    // userName='';
    user++;
  console.log(socket.name+' user connected' +"Totol user: ",user);



  // Handle chat messages
  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', { text: message, sender: socket.name });
    
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    user--;
    console.log("Toatal user: "+user+' A user disconnected:', socket.name);
  });
});

const PORT =  3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
