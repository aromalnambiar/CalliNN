// create a app
const app = require('express')();
// create a server using app
const server = require('http').createServer(app);
// implement a middleware for cors origin
const cors = require('cors');

// implement socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

// app using cors
app.use(cors());

// port

 const PORT = process.env.PORT || 5000;

// for run the server
app.get('/', (req, res) => {
    res.send("Running server..");
});


// setup socket.io for communication
io.on('connection', (socket) => {
    // my self
    socket.emit('me', socket.id);

    // call hugup or disconnect
    socket.on('disconnect', () =>{
        socket.broadcast.emit("callended");
    });

    // call the user and sent all the data
    socket.on("calluser", ({userTocall, signalData, from, name}) => {
        io.to(userTocall).emit("calluser", {signal : signalData, from, name})
    })

    // answer the call
    socket.on("answecall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})

server.listen(PORT, () => console.log(`listening on port${PORT}`));

