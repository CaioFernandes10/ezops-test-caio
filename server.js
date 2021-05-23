const { Socket } = require('dgram'); 
const express = require('express');
const path = require('path');
let typing = false;
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {

  res.render('index.html');


});
let messages = []; //armazena as mensagens

 io.on('connection', socket => {   //connection com o socket


  console.log(`socket conectado: ${socket.id}`);  //teste para ver se esta conectando 
  
  socket.emit('previousMessages', messages); // envia todas as mensagens anteriores assim que conectar na aplicacao
  
  socket.on('sendMessage', data => {    //recebe os dados do objeto 
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);   // envia uma message para todos os sockets conectados na aplicacao
  });

});





 server.listen(3000);

