//adiconando modulos para criaçao do server
const app = require('express')()
const http = require('http').createServer(app)
    //adicionando socket.io para chat
const io = require('socket.io')(http)
    //adicionando modulos para criação dos diretórios
const express = require('express')
    //adicionando path para colocar diretório de pastas
const path = require('path')

//criando caminho para pasta public
app.use(express.static(path.join(__dirname, 'public')))

//criando a rota inicial html dentro da pasta public
app.get('/', function(req, res) {
    res.sendFile(__dirname + 'public/index.html')
})

//adicionando entrada e saida do usuario no socket.io
io.on('connection', (socket) => {
        console.log('usuario conectado; id:', socket.id)
        socket.on('disconnect', function() {
            console.log('usuario desconectado; id:', socket.id)
        })
    })
    //adicionando comunicação com socket.io
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('mensage:' + msg)
        io.emit('chat message', msg)

    })
})


const PORT = 3000
http.listen(PORT, function() {
    console.log('servidor iniciado!')
    console.log('acesso:http://localhost:3000')
    console.log('BREAK SERVER ctrl + c')
})