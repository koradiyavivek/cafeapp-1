var express =require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')
app.set('view engine', 'hbs');

// login 
app.use('/', express.static(path.join(__dirname, '../login')))

// Client
app.use('/name', express.static(path.join(__dirname, '../public')))
// Admin
app.use('/admin', express.static(path.join(__dirname, '../admin')))


// Client Side 
app.get('/', (req,res)=> {
    res.render('login')
})

// Socket codes
io.on('connection', socket=> {
    // message form client
    socket.on('clientToServer', (messageFromClient)=> {
       console.log(messageFromClient)
       // send this data to admin 
       io.emit('serverToAdmin', messageFromClient)
    })
    
    // data from admin to client
    socket.on('adminToServer', dataFromAdmin=>{

        io.emit(dataFromAdmin.to, dataFromAdmin.message)
    })
})

// Listen to port
let port =process.env.PORT || 3000 
server.listen(port,()=>console.log("Server is up..."));